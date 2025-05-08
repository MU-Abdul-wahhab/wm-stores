import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
    }

    getRoutes() {
        this.router.get("/get", AuthController.getUser)
    }

}

export default new AuthRouter().router;