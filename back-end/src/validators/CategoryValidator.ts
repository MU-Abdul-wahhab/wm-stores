import { body, param, query } from "express-validator";
import { AppError } from "../utils/AppError";
import path from "path";

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
                    const ext = path.extname(req.file.originalname).toLowerCase();
                    if (ext !== ".svg") {
                        throw new AppError("Only .svg icons are allowed", 400);
                    }
                    return true
                } else {
                    throw new AppError("File Not Uploaded", 400);
                }
            }),
            body("specs")
                .isArray({ min: 1 }).withMessage("At least 2 specs are required")
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
            body("specs.*.unit_required", "")
                .isBoolean().optional(),

            body("specs.*.unit", "")
                .isString().withMessage("Unit must be a string")
                .notEmpty().withMessage("Unit cannot be empty")
                .toUpperCase().optional(),

            body("specs.*.type", "Each spec must have a valid type")
                .isIn(["string", "number", "boolean"]).withMessage(new AppError("Invalid Spec format", 400)),
        ]
    }

    static updateCategoryFeature() {
        return [
            param("id").isMongoId().withMessage("Invalid category ID"),
        ]
    }

    static updateCategory() {
        return [
            body().custom(value => {
                if (!value || typeof value !== "object") {
                    throw new Error("Invalid request body");
                }

                const { name, description, status, featured } = value;
                if (name === undefined && description === undefined && status === undefined && featured === undefined) {
                    throw new Error("At least one of name, description, status, or featured must be provided");
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

    static updateCategoryImage() {
        return [
            body("category", "Category Image is Required").custom((image, { req }) => {
                if (req.file) {
                    return true
                } else {
                    throw new AppError("File Not Uploaded", 400);
                }
            })
        ]
    }

    static addBrandToCategory() {
        return [
            body("brands", "Brands must be an array of valid MongoDB IDs")
                .isArray({ min: 1 }).withMessage("Brands must be a non-empty array")
                .bail()
                .custom(value => {
                    const uniqueValues = new Set(value);
                    if (uniqueValues.size !== value.length) {
                        throw new Error("Brands must contain unique values");
                    }
                    return true;
                }),
            body("brands.*", "Each brand must be a valid MongoDB ID")
                .isMongoId().withMessage("Invalid ObjectId format"),
        ]
    }

    static removeBrandFromCategory() {
        return [
            body("brands", "Brands must be an array of valid MongoDB IDs")
                .isArray({ min: 1 }).withMessage("Brands must be a non-empty array")
                .bail()
                .custom(value => {
                    const uniqueValues = new Set(value);
                    if (uniqueValues.size !== value.length) {
                        throw new Error("Brands must contain unique values");
                    }
                    return true;
                }),
            body("brands.*", "Each brand must be a valid MongoDB ID")
                .isMongoId().withMessage("Invalid ObjectId format"),
        ]
    }

    static addSpecToCategory() {
        return [
            body("specs", "Specs must be a non-empty array")
                .isArray({ min: 1 })
                .withMessage("Specs must be a non-empty array")
                .bail()
                .custom(value => {
                    const uniqueValues = new Set(value.map((spec) => spec.field));
                    if (uniqueValues.size !== value.length) {
                        throw new Error("Specs must contain unique field names");
                    }
                    return true;
                }),

            body("specs.*.field")
                .notEmpty().withMessage("Field cannot be empty")
                .isString().withMessage("Field must be a string")
                .toLowerCase(),

            body("specs.*.type")
                .notEmpty().withMessage("Type is required")
                .isIn(["string", "number", "boolean"]).withMessage("Invalid type"),

            body("specs.*.required")
                .toBoolean()
                .isBoolean().withMessage("Required must be a boolean"),

            body("specs.*.unit")
                .optional()
                .isString().withMessage("Unit must be a string"),

            body("specs.*.unit_required")
                .optional()
                .toBoolean()
                .isBoolean().withMessage("Unit Required must be a boolean"),

            body("specs.*").custom((spec) => {
                const { unit_required, unit } = spec;

                if (unit_required && (!unit || unit.trim() === "")) {
                    throw new Error("Unit is required as per unit_required setting");
                }

                if (!unit_required && unit && unit.trim() !== "") {
                    throw new Error("Unit should be empty when unit_required is false");
                }

                return true;
            }),
        ]
    }

    static removeSpecFromCategory() {
        return [
            param("categoryId").isMongoId().withMessage("Invalid category ID"),
            query("specId").isMongoId().withMessage("Invalid specs ID")
        ]
    }


}