import { NextFunction ,Response ,Request} from "express";
import { AppError } from "../utils/AppError";


export class GlobalErrorController {

    public static erroHandler(err : AppError, req : Request, res : Response, next : NextFunction) {
        // console.log(err.stack);

        if (process.env.NODE_ENV == 'development') {
            GlobalErrorController.sendErrorDev(err, res)
        } else if (process.env.NODE_ENV == 'production') {
            GlobalErrorController.sendErrorProd(err , res);
        }
    }

    private static sendErrorDev(err : AppError, res : Response) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    };

    private static sendErrorProd(err : AppError, res : Response) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
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

}