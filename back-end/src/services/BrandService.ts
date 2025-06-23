import Brand from "../models/BrandModel";
import { AppError } from "../utils/AppError";
import { Utils } from "../utils/Utils";

export class BrandService {

    public static async createBrand(data: any) {

        const { name, description, image } = data;

        let brandData: any = { name, description, image, status: false }

        const isExist = await Brand.findOne({ name });

        if (isExist) {
            Utils.deleteFile(image);
            throw new AppError("Brand name is already exist", 400);
        }

        if (data.category) {
            brandData = { ...brandData, category: data.category, status: true }
        }

        const brand = await Brand.create(brandData);

        return {
            brand
        }

    }

    public static async updateBrand(data : any) {

    }

}