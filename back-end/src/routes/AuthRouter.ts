import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import asyncHandler from "express-async-handler";

import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { AuthValidator } from "../validators/AuthValidator";
import { CatchAsync } from "../utils/CatchAsync";


class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
    }

    getRoutes() {
        this.router.get("/verify/email", AuthValidator.verifyEmail(), GlobalMiddleware.checkError, asyncHandler(AuthController.verifyEmail));
    }

    postRoutes() {
        this.router.post("/signup", AuthValidator.signUp(), GlobalMiddleware.checkError, CatchAsync.catchError(AuthController.signUp));
        this.router.post("/verify/get/email", AuthValidator.getVerificationEmail(), GlobalMiddleware.checkError, CatchAsync.catchError(AuthController.getVerificationEmail));
        this.router.post("/login", AuthValidator.logIn(), GlobalMiddleware.checkError, CatchAsync.catchError(AuthController.logIn));
        this.router.post("/getnewtoken", AuthValidator.getNewToken(), GlobalMiddleware.checkError , CatchAsync.catchError(GlobalMiddleware.auth), CatchAsync.catchError(AuthController.getNewToken));
    }

    putRoutes() {

    }

}

export default new AuthRouter().router;