import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller";

export class AuthenticationRouter {
    public Router: Router = Router();

    constructor() {
        this.installRoutes();
    }

    private installRoutes() {
        this.Router.post("/login",
            AuthenticationController.login,
        );
    }
}
