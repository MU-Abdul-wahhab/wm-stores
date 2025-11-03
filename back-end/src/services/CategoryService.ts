import mongoose from "mongoose";
import Category from "../models/CategoryModel";
import Brand from "../models/BrandModel";
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

    public static async getAllCategories(options) {

        // @ts-ignore
        const categories = await Category.paginate({ status: true }, options);
        return categories;
    }

    public static async getCategoryByKey(key: string) {
        // @ts-ignore
        let category;

        if (mongoose.Types.ObjectId.isValid(key)) {
            category = await Category.findById(key);
        } else {
            category = await Category.findOne({ name: key });
        }

        return category?.populate({ path: "brands", select: "name , image" });
    }

    public static async updateCategory(id: string, updateData: any) {
        // Update name , description , status

        const category = await Category.findById(id);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const newCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

        return newCategory;
    }

    public static async updateCategoryImage(data: { id: string, image: string, updated_by: string }) {
        const { id, image, updated_by } = data;
        const isExist = await Category.findById(id);
        if (!isExist) {
            Utils.deleteFile(image);
            throw new AppError("Category not found", 404);
        }
        Utils.deleteFile(isExist.image);
        const updatedCategory = await Category.findByIdAndUpdate(id, { image, updated_by }, { new: true });
        return updatedCategory;
    }

    public static async addBrandToCategory(id: string, brands: mongoose.Types.ObjectId[]) {
        // Add brands to category
        const category = await Category.findById(id);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const validBrands = await Brand.find({ _id: { $in: brands } });

        if (validBrands.length !== brands.length) {
            throw new AppError("One or more Brands IDs are invalid", 400);
        }

        const uniqueCategories = new Set([...category.brands.map(String), ...brands.map(String)]);

        // @ts-ignore
        category.brands = Array.from(uniqueCategories) as mongoose.Types.ObjectId[];
        await category.save();

        return category.populate({ path: "brands", select: "name , image" });

    }
    public static async removeBrandFromCategory(id: string, brands: mongoose.Types.ObjectId[]) {

        const isValidCategory = await Category.findById(id);
        if (!isValidCategory) {
            throw new AppError("Category not found", 404);
        }

        const validBrands = await Brand.find({ _id: { $in: brands } });

        if (validBrands.length !== brands.length) {
            throw new AppError("One or more Brand IDs are invalid", 400);
        }

        const isExistInCategory = await Category.findOne({ _id: id, brands: { $in: brands } });

        if (!isExistInCategory) {
            throw new AppError("None of the provided brands are associated with the category", 400);
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $pull: { brands: { $in: brands } } },
            { new: true }
        ).populate("brands", "name");

        if (!updatedCategory) {
            throw new AppError("Category not found", 404);
        }
        return updatedCategory.populate({ path: "brands", select: "name , image" });
    }

    public static async addSpecToCategory(id: string, specs: any) {
        // Add specs to category
        const category = await Category.findById(id);
        if (!category) {
            throw new AppError("Category not found", 404);
        }

        category.specs.push(...specs);
        await category.save();

        return category.populate({ path: "specs", select: "name , image" });
    }

    public static async removeSpecFromCategory(id: string, specId: mongoose.Types.ObjectId[]) {
        const category = await Category.findById(id);
        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const isValidSpecId = category.specs.some(spec => spec._id && specId.includes(spec._id));

        if (!isValidSpecId) {
            throw new AppError("Invalid Spec ID", 400);
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: category._id },
            { $pull: { specs: { _id: { $in: specId } } } },
            { new: true }
        );

        return updatedCategory;
    }

}