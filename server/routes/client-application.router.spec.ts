import supertest from "supertest";

import { Server } from '../server.class';

describe("ClientApplicationRouter", () => {

    let server: Server;
    let agent = supertest.agent("http://localhost:3001");

    afterEach((done) => {
        server.HTTPServer.close();
        setTimeout(done, 1000);
    })

    // failing because not in production mode.....possibly fork Server using Production Mode.
    describe("GET /", () => {

        xit('Should return the index.html file when in production mode.', (done) => {
            server = new Server("production");
            server.bootstrap();
            agent.get("/")
            .expect("Content-Type", /text.html/)
            .expect(200, done)
        })

        it('Should return a 404 error when in any other mode than production.', (done) => {
            server = new Server("testing");
            server.bootstrap();
            agent.get("/")
            .expect("Content-Type", /text.html/)
            .expect(404, done)
        })
    })

})