import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";

class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    getRoutes() {
        this.router.get("/get", AuthController.getUser)
    }

    postRoutes(){
        this.router.post("/signup" ,  GlobalMiddleware.checkError)
    }

}

export default new AuthRouter().router;