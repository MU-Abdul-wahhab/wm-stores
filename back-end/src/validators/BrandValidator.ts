import { body } from "express-validator";
import { AppError } from "../utils/AppError";
export class BrandValidator {

    static createBrand() {
        return [
            body("category", "Category must be an array of valid MongoDB IDs")
                .optional()
                .isArray({ min: 1 }).withMessage("Category must be a non-empty array")
                .bail(),
            body("category.*", "Each category must be a valid MongoDB ID")
                .isMongoId().withMessage("Invalid ObjectId format"),
            body("name", "Name Is Required").isString().toLowerCase().notEmpty().trim(),
            body("description", "Description Is Required").isString().notEmpty(),
            body("brand", "brand Is Required").custom((image, { req }) => {
                if (req.file) {
                    return true
                } else {
                   throw new AppError("File Not Uploaded", 400);
                }
            })
        ]
    }

}