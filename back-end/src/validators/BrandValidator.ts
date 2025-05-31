import { body } from "express-validator";

export class BrandValidator {

    static createBrand() {
        return [
            body("category", "Category Is Required").isString().notEmpty().trim(),
            body("name", "Name Is Required").isString().toLowerCase().notEmpty().trim(),
            body("logo", "Logo Path Is Required").isString().notEmpty(),
            body("description", "Description Is Required").isString().notEmpty(),
        ]
    }

}