import { AppError } from "./AppError"

export class CatchAsync {

    static catchError(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next).catch((error) => next(new AppError(error.message, 400))));
        }
    }

}