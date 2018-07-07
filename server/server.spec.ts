import { Server } from './server';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Server Initialization', () => {
    let _Server: Server;

    beforeEach(() => {
        _Server = new Server();
    })

    afterEach((done) => {
        _Server.HTTPServer.close();
        setTimeout(done, 1000);
    })

    describe('initServer()', () => {

        it ('Should instantiate the Server Class.', () => {
            expect(_Server).to.be.an.instanceOf(Server);
        });

        //it ('Should create a connection to the database.', () => {
        //    //expect(Server.DBConnection).to.not.be.undefined;
        //})

        it ('Should instantiate the Express Application.', () => {
            expect(_Server.Express).to.not.be.undefined;
        });

        it ('Should instantiate the HTTP Server.', () => {
            expect(_Server.HTTPServer).to.not.be.undefined;
        })

        it ('Should instantiate the Websocket Server.', () => {
            expect(_Server.WebsocketServer).to.not.be.undefined;
        });
    });

    describe('initEnvironment()', () => {
        it ('Should install the Client Default Route if in Production mode.', () => {
            let initAppServer = sinon.spy(_Server, 'initAppServer');
            process.env.NODE_ENV = 'production';
            _Server.initEnvironment();
            sinon.assert.called(initAppServer);
        })

        it ("Should invoke the getTokenSecret() method with devMode undefined when NODE_ENV environment variable is set to 'production'.", () => {
            let getTokenSecret = sinon.spy(_Server, 'getTokenSecret');
            process.env.NODE_ENV = 'production';
            _Server.initEnvironment();
            sinon.assert.calledOnce(getTokenSecret);
        })

        it ('Should invoke the getTokenSecret() method with devMode set to true when NODE_ENV environment variable is undefined.', () => {
            let getTokenSecret = sinon.spy(_Server, 'getTokenSecret').withArgs(true);
            process.env.NODE_ENV = undefined;
            _Server.initEnvironment();
            sinon.assert.calledOnce(getTokenSecret);
        })
    })

    describe('getTokenSecret()', () => {
        it ('Should generate a string representation for the Token Secret.', () => {
            expect(_Server.getTokenSecret()).to.be.string;
        })

        it ('Should generate a strong 256 character token secret when in Production mode.', () => {
            expect(_Server.getTokenSecret().length).to.equal(256);
        });

        it ('Should generate a token secret equal to "secret" when in Development mode.', () => {
            expect(_Server.getTokenSecret(true)).to.equal('secret');
        })
    });

    describe('getServerPort()', () => {
        it ('Should use port 3001 to setup the HTTP Server if no port environment variable is set', () => {
            expect(_Server.getServerPort()).to.equal(3001);
        })

        it ('Should us the port provided if port is set in the process environment variables.', async () => {
            process.env.PORT = '3010';
            expect(_Server.getServerPort()).to.equal(3010);
        })
    })
});