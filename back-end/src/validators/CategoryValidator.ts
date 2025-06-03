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
                  throw  new AppError("File Not Uploaded", 400);
                }
            })
        ]
    }

}