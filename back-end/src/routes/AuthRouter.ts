import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import asyncHandler from "express-async-handler";

import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { AuthValidator } from "../validators/AuthValidator";


class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    private getRoutes() {
        this.router.get("/verify/email", AuthValidator.verifyEmail(), GlobalMiddleware.checkError, asyncHandler(AuthController.verifyEmail));
        this.router.get("/verify/get/phone", GlobalMiddleware.auth, asyncHandler(AuthController.getPhoneotp));
        this.router.get("/verify/phone", AuthValidator.verifyPhone(), GlobalMiddleware.checkError, GlobalMiddleware.auth, asyncHandler(AuthController.verifyPhone));
        this.router.get("/verify/password/email",
            GlobalMiddleware.auth,
            asyncHandler(AuthController.getResetOtp));
    }

    private postRoutes() {
        this.router.post("/signup", AuthValidator.signUp(), GlobalMiddleware.checkError, asyncHandler(AuthController.signUp));
        this.router.post("/verify/get/email", AuthValidator.getVerificationEmail(), GlobalMiddleware.checkError, asyncHandler(AuthController.getVerificationEmail));
        this.router.post("/login", AuthValidator.logIn(), GlobalMiddleware.checkError, asyncHandler(AuthController.logIn));
        this.router.post("/getnewtoken", AuthValidator.getNewToken(), GlobalMiddleware.checkError, asyncHandler(GlobalMiddleware.auth), asyncHandler(AuthController.getNewToken));
    }

    private patchRoutes() {
        this.router.patch("/reset/password",
            GlobalMiddleware.auth,
            AuthValidator.resetPassword(),
            GlobalMiddleware.checkError, asyncHandler(AuthController.resetPassword)
        );
    }
}

export default new AuthRouter().router;