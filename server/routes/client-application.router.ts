import { Router } from "express";
import ClientApplicationController from "../controllers/client-application.controller";

export class ClientApplicationRouter {
    public Router: Router = Router();

    constructor() {
        this.installRoutes();
    }

    private installRoutes() {
        this.Router.get("/",
        ClientApplicationController.serveClientApplication,
    );
    }
}
