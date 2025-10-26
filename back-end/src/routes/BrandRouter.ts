import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import asyncHandler from "express-async-handler";
import { BrandController } from "../controllers/BrandController";
import { BrandValidator } from "../validators/BrandValidator";
import { Utils } from "../utils/Utils";

class BrandRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    private getRoutes() {
        this.router.get("/brands", asyncHandler(BrandController.getAllBrands));
    }
    private postRoutes() {
        this.router.post("/create",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            new Utils().multer.single("brand"),
            GlobalMiddleware.convertArray("category"),
            BrandValidator.createBrand(),
            GlobalMiddleware.checkError,
            asyncHandler(BrandController.createBrand));
    }

}

export default new BrandRouter().router;