// @ts-ignore
import express from "express";
import AuthRouter from "./routes/AuthRouter";
import mongoose from "mongoose";
import { getEnvVariables } from "./enviroments/enviroment";
import { Utils } from "./utils/Utils";
import helmet from "helmet";

import rateLimit from "express-rate-limit";
// @ts-ignore
import cors from "cors";
import { AppError } from "./utils/AppError";
import { GlobalErrorController } from "./controllers/GlobalErrorController";
import BrandRouter from "./routes/BrandRouter";
import CategoryRouter from "./routes/CategoryRouter";


const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});

export class Server {

    public app: express.Application = express();

    constructor() {

        this.setConfigs();
        this.connectMongoDB();
        this.setSecurityConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
    }

    setConfigs() {
        this.setDotenv();
        this.setBodyParser();
    }

    setRoutes() {
        this.app.use("/src/uploads", express.static("src/uploads"))
        this.app.use("/api/v1/auth", AuthRouter);
        this.app.use("/api/v1/brand", BrandRouter);
        this.app.use("/api/v1/category", CategoryRouter);
    }
    connectMongoDB() {
        mongoose.connect(getEnvVariables().db_url)
            .then(() => {
                console.log(`Mongo DB Connected`);
            })
            .catch(err =>
                console.log(err)
            );
    }

    setDotenv() {
        Utils.configDotenv();
    }

    setBodyParser() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    setSecurityConfigs() {
        // this.app.use(mongoSanitize());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use("/api", limiter);

    }

    error404Handler() {
        this.app.use((req, res, next) => {
            next(new AppError(`Requested ${req.originalUrl} Is Not Available`, 404));
        });
    }

    handleError() {
        this.app.use(GlobalErrorController.errorHandler);
    }

}