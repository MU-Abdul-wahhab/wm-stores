import express from "express";
import AuthRouter from "./routes/AuthRouter";
import mongoose from "mongoose";
import { getEnvVariables } from "./enviroments/enviroment";
import { Utils } from "./utils/Utils";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { AppError } from "./utils/AppError";
import { GlobalErrorController } from "./controllers/GlobalErrorController";

const limit = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: "Too Many Request From this IP. Please try again in an hour",
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
        this.app.use("/api/v1/auth", AuthRouter);
    }
    connectMongoDB() {
        mongoose.connect(getEnvVariables().db_url)
            .then(() => {
                console.log(`Mongo DB Connected`);
            })
            .catch(err => console.log(err));
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
        this.app.use("/api", limit);

    }

    error404Handler() {
        this.app.use((req, res , next) => {
          next(new AppError(`Requested ${req.originalUrl} Is Not Available` , 404));
        });
    }

    handleError(){
        this.app.use(GlobalErrorController.erroHandler);
    }

}