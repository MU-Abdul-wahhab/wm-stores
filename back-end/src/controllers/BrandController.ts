import { BrandService } from "../services/BrandService";
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
        const allowedSortValue = ["name", "-name"];

        const options = Utils.getSearchOptions(req.query, populate, allowedKeyParameter, allowedSortValue);

        const brands = await BrandService.getAllBrands(options);

        res.status(200).json({
            status: "success",
            message: "Brands fetched successfully",
            brands
        })
    }

}