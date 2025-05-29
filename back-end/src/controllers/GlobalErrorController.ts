import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError";


export class GlobalErrorController {

    public static erroHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
        if (process.env.NODE_ENV == 'development') {
            GlobalErrorController.sendErrorDev(err, res)
        } else if (process.env.NODE_ENV == 'production') {
            let error = { ...err };
            if (error.name === "TokenExpiredError") {
                error = GlobalErrorController.handleJwtExpire(error);
            }
            GlobalErrorController.sendErrorProd(error, res);
        }
    }

    private static sendErrorDev(err: AppError, res: Response) {
        res.status(err.statusCode || 500).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    };

    private static sendErrorProd(err: AppError, res: Response) {
        if (err.isOperational) {
            res.status(err.statusCode || 500).json({
                status: err.status,
                message: err.message,
            });
        } else {
            console.error(err);
            res.status(500).json({
                status: 'Error',
                message: 'Something went wrong',
            })
        }
    }

    private static handleJwtExpire(err) {
        return new AppError("Invalid Token Please Login Again", 401);
    }


}