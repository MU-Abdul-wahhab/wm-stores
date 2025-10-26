import Category from "../models/CategoryModel";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";

export class CategoryService {

    public static async createCategory(data: any) {

        const { name, description, image, specs } = data;
        let categoryData: any = { name, description, image, specs, status: false };

        const isExist = await Category.findOne({ name });

        if (isExist) {
            Utils.deleteFile(image);
            throw new AppError("Category Already Exist", 400);
        }

        if (data.brand) {
            categoryData = { ...categoryData, brands: data.brand, status: true }
        }

        const category = await Category.create(categoryData);

        return {
            category
        }

    }

    public static async updateCategoryStatus(data: any) {
        const categoryId = data.id;

        const field = data.field ? data.field : "status";

        const category = await Category.findById(categoryId);
        if (!category) throw new AppError("Category Not Found", 400);
        if (field !== "status" && field !== "isFeatured") throw new AppError("Sometthing went wrong", 400)
        category[field] = !category[field];
        const value = category[field];
        await category.save();
        return {
            field, value
        }
    }

    public static async getAllCategories(options) {

        // @ts-ignore
        const categories = await Category.paginate({}, options);
        return categories;
    }

}