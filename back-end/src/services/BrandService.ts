import Brand from "../models/BrandModel";
import Category from "../models/CategoryModel";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";

export class BrandService {

    public static async createBrand(data: any) {

        const { name, description, image, created_by } = data;

        let brandData: any = { name, description, image, created_by }

        const isExist = await Brand.findOne({ name });

        if (isExist) {
            Utils.deleteFile(image);
            throw new AppError("Brand name is already exist", 400);
        }

        if (data.category && Array.isArray(data.category)) {
            for (const id of data.category) {
                const categoryExists = await Category.findById(id);
                if (!categoryExists) {
                      Utils.deleteFile(image);
                    throw new AppError(`Invalid Category ID: ${id}`, 400);
                }
            }

            brandData = { ...brandData, category: data.category, status: true };
        }

        const brand = await Brand.create(brandData);

        return {
            brand
        }

    }

    public static async updateBrand(data: any) {

    }

}