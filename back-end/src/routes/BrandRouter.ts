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
        this.patchtRoutes();
    }

    private getRoutes() {
        this.router.get("/brands", GlobalMiddleware.setRole, asyncHandler(BrandController.getAllBrands));
        this.router.get("/:key", GlobalMiddleware.setRole, asyncHandler(BrandController.getBrandByKey));
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

    private patchtRoutes() {
        this.router.patch("/:id",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            BrandValidator.updateBrand(),
            GlobalMiddleware.checkError,
            asyncHandler(BrandController.updateBrand));

        this.router.patch("/:id/logo",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            new Utils().multer.single("brand"),
            BrandValidator.updateBrandImage(),
            GlobalMiddleware.checkError,
            asyncHandler(BrandController.updateBrandImage));

        this.router.patch("/:id/add-category",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            BrandValidator.addCategoryToBrand(),
            GlobalMiddleware.checkError,
            asyncHandler(BrandController.addCategoryToBrand)
        );

         this.router.patch("/:id/remove-category",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            BrandValidator.removeCategoryToBrand(),
            GlobalMiddleware.checkError,
            asyncHandler(BrandController.removeCategoryToBrand)
        );
    }

}

export default new BrandRouter().router;