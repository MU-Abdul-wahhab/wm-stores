import mongoose from "mongoose";
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

    public static async getAllBrands(options) {

        // @ts-ignore
        const brands = await Brand.paginate({ status: true }, options);
        return brands;
    }

    public static async getBrandByKey(key: string) {

        // @ts-ignore
        let brand;

        if (mongoose.Types.ObjectId.isValid(key)) {
            brand = await Brand.findById(key);
        } else {
            brand = await Brand.findOne({ name: key });
        }

        return brand?.populate({ path: "category", select: "name , image" });

    }

    public static async updateBrand(id: string, updateData: any) {
        const brand = await Brand.findById(id);

        if (!brand) {
            throw new AppError("Brand not found", 404);
        }

        const newBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true });

        return newBrand;
    }

    public static async updateBrandImage(data: { id: string, image: string, updated_by: string }) {
        const { id, image, updated_by } = data;

        const isExist = await Brand.findById(id);

        if (!isExist) {
            Utils.deleteFile(image);
            throw new AppError("Brand not found", 404);
        }

        Utils.deleteFile(isExist.image);

        const updatedBrand = await Brand.findByIdAndUpdate(id, { image, updated_by }, { new: true });

        return updatedBrand;

    }

    public static async addCategoryToBrand(id: string, categories: mongoose.Types.ObjectId[]) {
        const brand = await Brand.findById(id);

        if (!brand) {
            throw new AppError("Brand not found", 404);
        }

        const validCategories = await Category.find({ _id: { $in: categories } });

        if (validCategories.length !== categories.length) {
            throw new AppError("One or more Category IDs are invalid", 400);
        }

        const uniqueCategories = new Set([...brand.category.map(String), ...categories.map(String)]);

        // @ts-ignore
        brand.category = Array.from(uniqueCategories) as mongoose.Types.ObjectId[];
        await brand.save();

        return brand.populate({ path: "category", select: "name , image" });
    }

    public static async removeCategoryToBrand(id: string, categories: mongoose.Types.ObjectId[]) {

        const brand = await Brand.findById(id);

        if (!brand) {
            throw new AppError("Brand not found", 404);
        }

        const validCategories = await Category.find({ _id: { $in: categories } });

        if (validCategories.length !== categories.length) {
            throw new AppError("One or more Category IDs are invalid", 400);
        }

        const isExistInBrand = await Brand.findOne({ _id: id, category: { $in: categories } });

        if (!isExistInBrand) {
            throw new AppError("None of the provided categories are associated with the brand", 400);
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { $pull: { category: { $in: categories } } },
            { new: true }
        ).populate("category", "name");

        if (!updatedBrand) {
            throw new AppError("Brand not found", 404);
        }
        return updatedBrand.populate({ path: "category", select: "name , image" });
    }

}