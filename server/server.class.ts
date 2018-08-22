import { ForgeConfig, ForgeEnvironment } from "@TypeForge/typeforge";
import * as _ from "lodash";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, Router } from "express";
import fs from "fs";
import http from "http";
import morgan from "morgan";
import passwordGenerator from "password-generator";
import path from "path";
import "reflect-metadata";
import socketIO from "socket.io";
import redisAdapter from "socket.io-redis";
import { Connection, createConnection } from "typeorm";
import { AuthenticationRouter } from "./routes/authentication.router";
import { ClientApplicationRouter } from "./routes/client-application.router";

/**
 * Main Server Class of the entire project. In production, this should be serving the
 * bundled files of the Angular application.
 */
export class Server {
    // Initialize DB Connection Property
    public DBConnection: Connection;
    // Initialize Express Property
    public Express: express.Application;
    // Initialize Forge Config Property
    public ForgeConfig: ForgeConfig;
    // Initialize the HTTP Server Property
    public HTTPServer: http.Server;
    // Initialize the Websocket Socket Server Property
    public WebsocketServer: SocketIO.Server;

    constructor(
        public ENVIRONMENT: ForgeEnvironment = process.env.NODE_ENV as ForgeEnvironment || "development",
    ) {
        // Get and Parse the Forge Config File
        this.ForgeConfig = this.getForgeConfig();
    }

    private getForgeConfig() {
        let forgeConfig = fs.readFileSync("forgeconfig.json", "utf8");
        return forgeConfig ? JSON.parse(forgeConfig) : {};
    }

    public bootstrap = async (): Promise<void> => {
        await this.initServer();
        await this.initEnvironment();
    }

    public initDBConnection = async (): Promise<void> => {
        // Create the SQL Database connection before setting up Express so all requests can immediately be served.
        // this.DBConnection = await createConnection();
    }

    public initRouter() {
        const Router: Router = express.Router();
        this.Express.use("/api/v1/authentication", new AuthenticationRouter().Router);
    }

    /**
     * Initialize the Application server for the Angular Application
     */
    public initAppServer() {
        // Serve the Angular Application
        this.Express.use(express.static(path.resolve("build/client")));
        this.Express.use("*", new ClientApplicationRouter().Router);
    }

    /**
     *
     */
    public HTTPServerErrorHandler(error: Error) {
        console.log(error);
        process.exit(1);
    }

    /**
     * Get the Server Port used to setup the HTTP Server
     *
     * If in production mode the server will use the provided port, if one has been provided.
     * Otherwise, the server will use port 3001. This should not be overridden as it is hardcoded into
     * the client's ServiceTargetsService as the development mode default.
     *
     * The reason we do this is because Angular's development port is set to 4200 by default, which is
     * different than the Server's listening port. The client's ServiceTargetsService uses the port in the url of the
     * window to derive the location of the API. So in Development mode, we need to have something statically defined.
     *
     * @returns {number} The port number to listen on.
     */
    public getServerPort(): number {
        return this.ENVIRONMENT === "production" ? _.get(this.ForgeConfig, ["APIPort"], undefined) || 3001 : 3001;
    }

    /**
     * Generate the Token Secret used for encrypting JSON WebTokens.
     * @param {boolean} devMode Indicates whether or not the current build is in development mode.
     * @returns {string} String representation of the Token Secret.
     */
    public getTokenSecret(devMode: boolean = false): string {
        return devMode ? "secret" : passwordGenerator(256, false);
    }

    /**
     * Initializes the Connection to the SQL Database and Instantiates the Express Server.
     */
    private initServer = async (): Promise<void> => {
        // Initialize the DB Connection
        await this.initDBConnection();
        // Instantiate the Express Application with Cors and Body Parser
        this.Express = express().use(cors());
        this.Express.use(bodyParser.json());
        this.Express.use(bodyParser.urlencoded({ extended: true }));

        // Install Routes
        this.initRouter();

        // Get the Server Port to listen on.
        const serverPort = this.getServerPort();
        // Start the HTTP Server and setup Express Listener
        this.HTTPServer = this.Express.listen(serverPort);
        // Define Http Server Error Behavior
        this.HTTPServer.on("error", this.HTTPServerErrorHandler);
        // Bind a Socket.IO WebSocket Server to the existing HTTPServer
        this.WebsocketServer = socketIO(this.HTTPServer);
        // Bind the Socket.IO Server to the Redis Adapter for continuity between instances
        if (this.ForgeConfig && this.ForgeConfig.multithreading) {
            this.WebsocketServer.adapter(redisAdapter({ host: "localhost", port: 6379 }));
        }
    }

    /**
     * Run Post Server Initialization processes.
     */
    private initEnvironment = async (): Promise<void> => {
        // Run Environment specific tasks
        if (this.ENVIRONMENT === "production") {
            // If Production generate a random 256 Character Token Secret used to Encrypt Tokens.
            this.Express.set("tokenSecret", this.getTokenSecret());
            /*
             * If Production serve the bundled application from the 'build' directory.
             * If active development is taking place, the Angular Development Server should be used.
             */
            this.initAppServer();

        } else {
            // Generate Development Token Secret so Tokens survive Application Rebuilds
            this.Express.set("tokenSecret", this.getTokenSecret(true));

            // If Development Mode, Log HTTP Server Requests to the console
            if (this.ENVIRONMENT === "development") {
                console.log(`Process: ${process.pid} Listening on Port ${this.getServerPort()}`);
                this.Express.use(morgan("dev"));
            }
        }
    };
}
