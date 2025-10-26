import { Router } from "express";
import { CategoryValidator } from "../validators/CategoryValidator";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { CategoryController } from "../controllers/CategoryController";
import { Utils } from "../utils/Utils";
import asyncHandler from "express-async-handler";
class CategoryRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }

    private getRoutes() {
        this.router.get("/categories", asyncHandler(CategoryController.getAllCategories));
    }

    private postRoutes() {
        this.router.post("/create", GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            new Utils().multer.single('category'),
            GlobalMiddleware.parseJSON('specs'),
            CategoryValidator.createCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.createCategory));
    }

    private patchRoutes() {
        this.router.patch("/:id/status", GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.updateCategoryStatus(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.updateCategoryStatus)
        );

    }
}

export default new CategoryRouter().router;
