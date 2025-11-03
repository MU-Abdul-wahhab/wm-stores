// CategoryController.ts content

import { CategoryService } from "../services/CategoryService";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";

export class CategoryController {

    public static async createCategory(req, res) {

        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        const { name, description, specs } = req.body;
        let data: any = {
            name, description, image, specs
        }
        if (req.body.brand) {
            data = { ...data, brand: req.body.brand }
        }

        const category = await CategoryService.createCategory(data);
        res.status(201).json({
            status: "success",
            message: "Category has created successfully",
            category
        })
    }

    public static async getAllCategories(req, res) {
        const populate = { path: "brands", select: "name" };
        const allowedKeyParameter = ["page", "limit", "sort"];
        const allowedSortValue = ["name", "-name", "created_at", "-created_at"];

        const options = Utils.getSearchOptions(req.query, populate, allowedKeyParameter, allowedSortValue, req.isAdmin);

        const categories = await CategoryService.getAllCategories(options);

        res.status(200).json({
            status: "success",
            message: "Categories fetched successfully",
            categories
        })
    }

    public static async getCategoryByKey(req, res) {
        const { key } = req.params;

        const category = await CategoryService.getCategoryByKey(key);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Category fetched successfully",
            category
        })
    }

    public static async updateCategory(req, res) {
        // Update name , description , status , featured
        const { id } = req.params;
        const updateData = { ...req.body, updated_by: req.user.email };

        const updatedCategory = await CategoryService.updateCategory(id, updateData);

        res.status(200).json({
            status: "success",
            message: "Category updated successfully",
            category: updatedCategory
        });
    }

    public static async updateCategoryImage(req, res) {
        // Update category image

        const id = req.params.id;
        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        let data: any = {
            id,
            image,
            updated_by: req.user.email
        }

        const category = await CategoryService.updateCategoryImage(data);

        res.status(200).json({
            status: "success",
            message: "Category image updated successfully",
            category
        });
    }

    public static async addBrandToCategory(req, res) {
        // Add brands to category

        const id = req.params.id;
        const brands = req.body.brands;

        const category = await CategoryService.addBrandToCategory(id, brands);

        res.status(201).json({
            status: "success",
            message: "Brands added to category successfully",
            category
        });
    }

    public static async removeBrandFromCategory(req, res) {
        // Remove brands from category

        const id = req.params.id;
        const brands = req.body.brands;

        const category = await CategoryService.removeBrandFromCategory(id, brands);

        res.status(201).json({
            status: "success",
            message: "Brands removed from category successfully",
            category
        });
    }

    public static async addSpecToCategory(req, res) {
        // Add specs to category

        const updatedCategory = await CategoryService.addSpecToCategory(req.params.id, req.body.specs);

        res.status(201).json({
            status: "success",
            message: "Specs added to category successfully",
            category: updatedCategory
        });
    }

    public static async removeSpecFromCategory(req, res) {
        // Remove specs from category
        const categoryId = req.params.categoryId;
        const specIds = req.query.specId;

       const category = await CategoryService.removeSpecFromCategory(categoryId, specIds);

        res.status(201).json({
            status: "success",
            message: "Specs removed from category successfully",
            category
        });
    }

}