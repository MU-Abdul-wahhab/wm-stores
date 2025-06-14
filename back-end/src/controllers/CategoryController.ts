// CategoryController.ts content

import { CategoryService } from "../services/CategoryService";

export class CategoryController {

    public static async createCategory(req, res) {

        const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;

        const { name, description, specs } = req.body;
        let data: any = {
            name, description, image, specs
        }
        if (req.body.brand) {
            data = { ...data, brand: req.body.brand }
        }

        const category = await CategoryService.createCategory(data);
        res.status(201).json({
            status: "success",
            message: "Category has created successfully",
            category
        })


    }

    public static async updateCategoryStatus(req, res) {

        const id = req.params.id;
        const field = req.query?.field;

        const data = {
            id, field
        }

        await CategoryService.updateCategoryStatus(data);

        res.status(201).json({
            status: "success",
            message: "Category Updated",
        })
    }
}

// 1. Brands
// 2. Name
// 3. Description
// 4. Image
// 5. status
// 6. specs
// 7. iSFeatured