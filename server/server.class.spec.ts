import fs from "fs";
import sinon from "sinon";
import { expect } from "chai";
import { Server } from "./server.class";
import { ForgeEnvironment, ForgeConfig } from "@TypeForge/typeforge";

describe("Server", () => {
    let server: Server;
    let forgeConfigStub: sinon.SinonStub;

    const serverFactory = (ENVIRONMENT: ForgeEnvironment = "testing") => {
        return new Server(ENVIRONMENT);
    };

    describe("constructor()", () => {

        afterEach((done) => {
            server.HTTPServer.close();
            forgeConfigStub.restore();
            setTimeout(done, 1000);
        })

        it ("Should get and set the ForgeConfig property if the forgeconfig.json file exists.", () => {
            forgeConfigStub = sinon.stub(fs, "readFileSync").onCall(0).returns(JSON.stringify({ "multithreading": false }));
            server = serverFactory();
            server.bootstrap();
            expect(server.ForgeConfig.multithreading).to.equal(false);
        })

        it ("Should set the ForgeConfig property as an empty object if the forgeconfig.json file is not found.", () => {
            forgeConfigStub = sinon.stub(fs, "readFileSync").onCall(0).returns(undefined);
            server = serverFactory();
            server.bootstrap();
            expect(server.ForgeConfig).to.deep.equal({});
        })
    });

    describe("initServer()", () => {

        before(() => {
            server = serverFactory();
            server.bootstrap();
        });

        after((done) => {
            server.HTTPServer.close();
            setTimeout(done, 1000);
        });

        it ("Should instantiate the Server Class.", () => {
            expect(server).to.be.an.instanceOf(Server);
        });

        // it ('Should create a connection to the database.', () => {
        //    //expect(Server.DBConnection).to.not.be.undefined;
        // })

        it ("Should instantiate the Express Application.", () => {
            expect(server.Express).to.not.be.undefined;
        });

        it ("Should instantiate the HTTP Server.", () => {
            expect(server.HTTPServer).to.not.be.undefined;
        });

        it ("Should instantiate the Websocket Server.", () => {
            expect(server.WebsocketServer).to.not.be.undefined;
        });
    });

    describe("initEnvironment()", () => {

        afterEach((done) => {
            server.HTTPServer.close();
            setTimeout(done, 1000);
        })

        it ("Should install the Client Default Route if in Production mode.", async () => {
            server = serverFactory("production");
            const initAppServerSpy = sinon.spy(server, "initAppServer");
            await server.bootstrap();
            sinon.assert.calledOnce(initAppServerSpy);
        });

        it ("Should invoke the getTokenSecret() method with devMode undefined when NODE_ENV environment variable is set to 'production'.", async () => {
            server = serverFactory("production");
            const getTokenSecretSpy = sinon.spy(server, "getTokenSecret");
            await server.bootstrap();
            sinon.assert.calledOnce(getTokenSecretSpy);
        });

        it ("Should invoke the getTokenSecret() method with devMode set to true when NODE_ENV environment variable is not set to 'production'.", async () => {
            server = serverFactory("testing");
            const getTokenSecretSpy = sinon.spy(server, "getTokenSecret");
            await server.bootstrap();
            sinon.assert.calledOnce(getTokenSecretSpy.withArgs(true));
        });
    });

    describe("getTokenSecret()", () => {

        before(() => {
            server = serverFactory()
            server.bootstrap();
        });

        after((done) => {
            server.HTTPServer.close();
            setTimeout(done, 1000);
        })

        it ("Should generate a string representation for the Token Secret.", () => {
            expect(server.getTokenSecret()).to.be.string;
        });

        it ("Should generate a strong 256 character token secret when in Production mode.", () => {
            expect(server.getTokenSecret().length).to.equal(256);
        });

        it ('Should generate a token secret equal to "secret" when in Development mode.', () => {
            expect(server.getTokenSecret(true)).to.equal("secret");
        });
    });

    describe("getServerPort()", () => {

        before(() => server = serverFactory());

        it ("Should use port 3001 to setup the HTTP Server if no port environment is set in forgeconfig.json and the ENVIRONMENT is set to 'production'..", () => {
            server.ENVIRONMENT = 'production';
            server.ForgeConfig.APIPort = undefined;
            expect(server.getServerPort()).to.equal(3001);
        });

        it ("Should use the port provided in forgeonfig.json if port is set in the process environment variables and the ENVIRONMENT is set to 'production'.", async () => {
            server.ENVIRONMENT = 'production';
            server.ForgeConfig.APIPort = 3010;
            expect(server.getServerPort()).to.equal(3010);
        });

        it ("Should use port 3001 if the ENVIRONMENT is set to anything but 'production'.", () => {
            server.ENVIRONMENT = 'development';
            server.ForgeConfig.APIPort = 3010;
            expect(server.getServerPort()).to.equal(3001);
        });
    });
});
