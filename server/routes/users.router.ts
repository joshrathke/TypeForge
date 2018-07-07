import { Router } from "express";

export class UsersRouter {
    Router: Router = Router();

    constructor() {
        this.installRoutes();
    }

    private installRoutes() {
        this.Router.get('/');
        this.Router.post('/');
        this.Router.get('/:userID');
        this.Router.put('/:userID');
        this.Router.delete('/:userID');
    }
}