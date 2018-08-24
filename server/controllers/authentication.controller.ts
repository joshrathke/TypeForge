import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express-serve-static-core";
import {LoginPostBody} from "@TypeForge/routers/authentication.router";

export class AuthenticationController {

    public login = async (req: Request, res: Response) => {
        let loginBody: LoginPostBody = req.body;
    }
}

export default new AuthenticationController();
