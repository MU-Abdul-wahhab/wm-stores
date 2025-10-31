import { BrandService } from "../services/BrandService";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";


export class BrandController {

    public static async createBrand(req, res) {

        const { name, description } = req.body;
        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        let data: any = {
            name, description, image,
            created_by: req.user.email
        }

        if (req.body.category) {
            data = { ...data, category: req.body.category }
        }

        const brand = await BrandService.createBrand(data);

        res.status(201).json({
            status: "success",
            message: "Brand has created successfully",
            brand
        })
    }

    public static async getAllBrands(req, res) {

        const populate = { path: "category", select: "name" };
        const allowedKeyParameter = ["page", "limit", "sort"];
        const allowedSortValue = ["name", "-name", "created_at", "-created_at"];


        const options = Utils.getSearchOptions(req.query, populate, allowedKeyParameter, allowedSortValue, req.isAdmin);

        const brands = await BrandService.getAllBrands(options);

        res.status(200).json({
            status: "success",
            message: "Brands fetched successfully",
            brands
        })
    }

    public static async getBrandByKey(req, res) {
        const { key } = req.params;

        const brand = await BrandService.getBrandByKey(key);

        if (!brand) {
            throw new AppError("Brand not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Brand fetched successfully",
            brand
        })
    }

    public static async updateBrand(req, res) {
        const { id } = req.params;
        const updateData = { ...req.body, updated_by: req.user.email };

        const updatedBrand = await BrandService.updateBrand(id, updateData);

        res.status(200).json({
            status: "success",
            message: "Brand updated successfully",
            brand: updatedBrand
        });
    }

    public static async updateBrandImage(req, res) {

        const id = req.params.id;
        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        let data: any = {
            id,
            image,
            updated_by: req.user.email
        }

        const brand = await BrandService.updateBrandImage(data);

        res.status(200).json({
            status: "success",
            message: "Brand image updated successfully",
            brand
        });
    }

    public static async addCategoryToBrand(req, res) {
        const id = req.params.id;
        const categories = req.body.categories;

        const brand = await BrandService.addCategoryToBrand(id, categories);

        res.status(201).json({
            status: "success",
            message: "Categories added to brand successfully",
            brand
        });
    }

     public static async removeCategoryToBrand(req, res) {
        const id = req.params.id;
        const categories = req.body.categories;

        const brand = await BrandService.removeCategoryToBrand(id, categories);

        res.status(201).json({
            status: "success",
            message: "Categories removed from brand successfully",
            brand
        });
    }

}