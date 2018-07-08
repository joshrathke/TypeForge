import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import passwordGenerator from 'password-generator';
import path from 'path';
import redisAdapter from 'socket.io-redis';
import socketIO from 'socket.io';
import { createConnection, Connection } from "typeorm";
import { Request, Response } from 'express';

/**
 * Main Server Class of the entire project. In production, this should be serving the
 * bundled files of the Angular application.
 */
export class Server {
    // Initialize DB Connection Property
    public DBConnection: Connection;
    // Initialize Express Property
    public Express: express.Application;
    // Initialize the HTTP Server Property
    public HTTPServer: http.Server;
    // Initialize the Websocket Socket Server Property
    public WebsocketServer: SocketIO.Server;

    constructor() {
        // Initialize the Server
        this.initServer().then(() => this.initEnvironment());
    }

    initDBConnection = async (): Promise<void> => {
        // Create the SQL Database connection before setting up Express so all requests can immediately be served.
        this.DBConnection = await createConnection();    
    }

    /**
     * Initializes the Connection to the SQL Database and Instiates the Express Server.
     */
    public initServer = async (): Promise<void> => {
        // Initialize the DB Connection
        await this.initDBConnection();
        // Instantiate the Express Application with Cors
        this.Express = express().use(cors());

        // Get the Server Port to listen on.
        let serverPort = this.getServerPort();
        // Start the HTTP Server and setup Express Listener
        this.HTTPServer = this.Express.listen(serverPort, () => {
            console.log(`Process: ${process.pid} Listening on Port ${serverPort}`);
        })
        // Define Http Server Error Behavior
        this.HTTPServer.on('error', this.HTTPServerErrorHandler);
        // Bind a Socket.IO Websocket Server to the existing HTTPServer
        this.WebsocketServer = socketIO(this.HTTPServer);
        // Bind the Socket.IO Server to the Redis Adapter for continuity between instances
        this.WebsocketServer.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
    }

    /**
     * Run Post Server Initialization processes.
     */
    public initEnvironment = async(): Promise<void> => {
        // Run Environment specific tasks
        if (process.env.NODE_ENV === 'production') {
            // If Production generate a random 256 Character Token Secret used to Encrypt Tokens.
            this.Express.set('tokenSecret', this.getTokenSecret());
            // If Production serve the bundled application from the 'build' directory.
            // If active development is taking place, the Angular Development Server should be used.
            this.initAppServer();
		} else {
            // Generate Development Token Secret so Tokens survive Application Rebuilds
            this.Express.set('tokenSecret', this.getTokenSecret(true));
            // Log HTTP Server Requests to the console
            this.Express.use(morgan('dev'));
        }
    }

    /**
     * Initialize the Application server for the Angular Applicaiton
     */
    public initAppServer() {
        // Serve the Angular Application
		this.Express.use(express.static(path.join(__dirname, './client')));
		this.Express.use('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, './client/index.html')));
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
        return devMode ? 'secret' : passwordGenerator(256, false);
    }
}