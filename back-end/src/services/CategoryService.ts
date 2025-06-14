import Category from "../models/CategoryModel";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";

export class CategoryService {

    public static async createCategory(data: any) {

        const { name, description, image, specs } = data;
        let categoryData: any = { name, description, image, specs, status: false  };

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

    public static async updateCategory(data: any) {

    }

}