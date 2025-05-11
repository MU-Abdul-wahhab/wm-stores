import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError";

export class GlobalMiddleware {
    static checkError(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(new AppError(errors.array()[0].msg, 403))
        } else {

            next();
        }


    }
}