import { BrandService } from "../services/BrandService";


export class BrandController {

    public static async createBrand(req, res) {

        const { name, description } = req.body;
        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        let data: any = {
            name, description, image
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

}