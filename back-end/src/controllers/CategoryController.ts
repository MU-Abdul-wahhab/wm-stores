// CategoryController.ts content

import { CategoryService } from "../services/CategoryService";

export class CategoryController {

    public static async createCategory(req, res) {

        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        const { name, description } = req.body;
        let data: any = {
            name, description, image
        }
        if (req.body.brand) {
            data = { ...data, brand: req.body.brand }
        }

        const category = await CategoryService.createCategory(data);
        res.status(201).json({
            category
        });


    }
}