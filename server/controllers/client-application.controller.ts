import { NextFunction, Request, Response } from "express";
import path from "path";

export class ClientApplicationController {

    /**
     * Serve the Client Application
     *
     * @param {Request} req The Express Request Object
	   * @param {Response} res The Express Response Object
	   * @param {NextFunction} next The Express Next Function Object
     */
    public serveClientApplication = (req: Request, res: Response, next: NextFunction) => {
      console.log('SERVER APP');
		  res.sendFile(path.resolve("build/client/index.html"));
    }
}

// Export Instance of the Controller
export default new ClientApplicationController();
