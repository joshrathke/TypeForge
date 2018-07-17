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
    public forgeConfig: any;
    // Initialize the HTTP Server Property
    public HTTPServer: http.Server;
    // Initialize the Websocket Socket Server Property
    public WebsocketServer: SocketIO.Server;

    constructor() {
        // Initialize the Server
        this.initServer().then(() => this.initEnvironment());
    }

    public initDBConnection = async (): Promise<void> => {
        // Create the SQL Database connection before setting up Express so all requests can immediately be served.
        // this.DBConnection = await createConnection();
    }

    /**
     * Initializes the Connection to the SQL Database and Instiates the Express Server.
     */
    public initServer = async (): Promise<void> => {
        // Get and Parse the Forge Config File
        this.forgeConfig = JSON.parse(fs.readFileSync("forgeconfig.json", "utf8"));
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
        this.HTTPServer = this.Express.listen(serverPort, () => {
            console.log(`Process: ${process.pid} Listening on Port ${serverPort}`);
        });
        // Define Http Server Error Behavior
        this.HTTPServer.on("error", this.HTTPServerErrorHandler);
        // Bind a Socket.IO Websocket Server to the existing HTTPServer
        this.WebsocketServer = socketIO(this.HTTPServer);
        // Bind the Socket.IO Server to the Redis Adapter for continuity between instances
        if (this.forgeConfig && this.forgeConfig.multithreading) {
            this.WebsocketServer.adapter(redisAdapter({ host: "localhost", port: 6379 }));
        }
    }

    /**
     * Run Post Server Initialization processes.
     */
    public initEnvironment = async (): Promise<void> => {
        // Run Environment specific tasks
        if (process.env.NODE_ENV === "production") {
            // If Production generate a random 256 Character Token Secret used to Encrypt Tokens.
            this.Express.set("tokenSecret", this.getTokenSecret());
            // If Production serve the bundled application from the 'build' directory.
            // If active development is taking place, the Angular Development Server should be used.
            this.initAppServer();
		} else {
            // Generate Development Token Secret so Tokens survive Application Rebuilds
            this.Express.set("tokenSecret", this.getTokenSecret(true));
            // Log HTTP Server Requests to the console
            this.Express.use(morgan("dev"));
        }
    }

    public initRouter() {
        const Router: Router = express.Router();
        this.Express.use("/api/v1/authentication", new AuthenticationRouter().Router);
    }

    /**
     * Initialize the Application server for the Angular Applicaiton
     */
    public initAppServer() {
        // Serve the Angular Application
		this.Express.use(express.static(path.join(__dirname, "./client")));
		this.Express.use("*", (req: Request, res: Response) => res.sendFile(path.join(__dirname, "./client/index.html")));
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
     * @returns {number} The port number to listen on.
     */
    public getServerPort(): number {
        return parseInt(process.env.PORT) || 3001;
    }

    /**
     * Generate the Token Secret used for encrypting JSON Webtokens.
     * @param {boolean} devMode Indicates whether or not the current build is in development mode.
     * @returns {string} String representation of the Token Secret.
     */
    public getTokenSecret(devMode: boolean = false): string {
        return devMode ? "secret" : passwordGenerator(256, false);
    }
}
