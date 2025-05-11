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
    }

    getRoutes() {
        this.router.get("/login", AuthController.getUser)
    }

    postRoutes(){
        this.router.post("/signup" , AuthValidator.signUp() , GlobalMiddleware.checkError , asyncHandler(AuthController.signUp))
    }

}

export default new AuthRouter().router;