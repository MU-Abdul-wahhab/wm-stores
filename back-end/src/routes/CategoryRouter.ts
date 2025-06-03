// CategoryRouter.ts content

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
    }

    private postRoutes() {
        this.router.post("/create", GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            new Utils().multer.single('category'),
            CategoryValidator.createCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.createCategory));
    }
}

export default new CategoryRouter().router;
