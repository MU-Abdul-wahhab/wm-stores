import { body } from "express-validator";
import { AppError } from "../utils/AppError";

export class CategoryValidator {

    static createCategory() {
        return [
            body("brand")
                .optional()
                .isMongoId().withMessage("Invalid ID"),
            body("name", "Name is Required").trim().notEmpty().toLowerCase(),
            body("description", "Description is Required").notEmpty(),
            body("category", "Category Image is Required").custom((category, { req }) => {
                if (req.file) {
                    return true
                } else {
                    throw new AppError("File Not Uploaded", 400);
                }
            }),
            body("specs")
                .isArray({ min: 2 }).withMessage("At least 2 specs are required")
                .custom((specs) => {
                    if (!Array.isArray(specs)) throw new AppError("Specs must be an array", 400);
                    if (specs.length < 2) throw new AppError("At least 2 specs are required", 400);
                    return true;
                }),

            body("specs.*.field", "Each spec must have a field name")
                .isString().withMessage("Field must be a string")
                .notEmpty().withMessage("Field cannot be empty")
                .toLowerCase().customSanitizer(value => {
                    if (typeof value === 'string') {
                        return value.replace(/\s+/g, "_");
                    }
                    return value;
                }),

            body("specs.*.type", "Each spec must have a valid type")
                .isIn(["string", "number", "boolean"]).withMessage("Invalid type in specs"),
        ]
    }

}