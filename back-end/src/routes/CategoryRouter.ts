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
        this.router.get("/categories", GlobalMiddleware.setRole, asyncHandler(CategoryController.getAllCategories));
        this.router.get("/:key", GlobalMiddleware.setRole, asyncHandler(CategoryController.getCategoryByKey));
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
        this.router.patch("/:id",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.updateCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.updateCategory));

        this.router.patch("/:id/logo",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            new Utils().multer.single("category"),
            CategoryValidator.updateCategoryImage(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.updateCategoryImage));

        this.router.patch("/:id/add-brand",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.addBrandToCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.addBrandToCategory)
        );

        this.router.patch("/:id/remove-brand",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.removeBrandFromCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.removeBrandFromCategory)
        );

        this.router.patch("/:id/add-spec",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.addSpecToCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.addSpecToCategory)
        );

        this.router.patch("/:categoryId/remove-spec",
            GlobalMiddleware.auth,
            GlobalMiddleware.checkRole("admin"),
            CategoryValidator.removeSpecFromCategory(),
            GlobalMiddleware.checkError,
            asyncHandler(CategoryController.removeSpecFromCategory)
        );
    }
}

export default new CategoryRouter().router;