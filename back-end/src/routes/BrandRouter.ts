import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import asyncHandler from "express-async-handler";
import { BrandController } from "../controllers/BrandController";

class BrandRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    private getRoutes() {
        
    }
    private postRoutes() {
        this.router.post("/create", GlobalMiddleware.auth , GlobalMiddleware.checkRole("admin") , asyncHandler(BrandController.createBrand));
    }

}

export default new BrandRouter().router;