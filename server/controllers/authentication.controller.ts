import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express-serve-static-core";

export class AuthenticationController {

    public login = async (req: Request, res: Response) => {
        console.log(await bcrypt.genSalt(12));
    }
}

export default new AuthenticationController();
