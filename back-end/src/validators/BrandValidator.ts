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

    static updateBrand() {
        return [
            body().custom(value => {
                if (!value || typeof value !== "object") {
                    throw new Error("Invalid request body");
                }

                const { name, description, status } = value;
                if (name === undefined && description === undefined && status === undefined) {
                    throw new Error("At least one of name, description, or status must be provided");
                }
                return true;
            }),
            body("name").optional().isString().toLowerCase().notEmpty().trim()
                .withMessage("Name is required"),
            body("description").optional().isString().notEmpty()
                .withMessage("Description is required"),
            body("status").optional().isBoolean()
                .withMessage("Status must be a boolean"),
        ];
    }

    static updateBrandImage() {
        return [
            body("brand", "brand Is Required").custom((image, { req }) => {
                if (req.file) {
                    return true
                } else {
                    throw new AppError("File Not Uploaded", 400);
                }
            })
        ]
    }

    static addCategoryToBrand() {
        return [
            body("categories", "Categories must be an array of valid MongoDB IDs")
            .isArray({ min: 1 }).withMessage("Categories must be a non-empty array")
            .bail()
            .custom(value => {
                const uniqueValues = new Set(value);
                if (uniqueValues.size !== value.length) {
                throw new Error("Categories must contain unique values");
                }
                return true;
            }),
            body("categories.*", "Each category must be a valid MongoDB ID")
            .isMongoId().withMessage("Invalid ObjectId format"),
        ]
    }

     static removeCategoryToBrand() {
        return [
            body("categories", "Categories must be an array of valid MongoDB IDs")
            .isArray({ min: 1 }).withMessage("Categories must be a non-empty array")
            .bail()
            .custom(value => {
                const uniqueValues = new Set(value);
                if (uniqueValues.size !== value.length) {
                throw new Error("Categories must contain unique values");
                }
                return true;
            }),
            body("categories.*", "Each category must be a valid MongoDB ID")
            .isMongoId().withMessage("Invalid ObjectId format"),
        ]
    }


}