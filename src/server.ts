import express from "express";
import AuthRouter from "./routes/AuthRouter";

export class Server{

    public app : express.Application = express();

    constructor(){
        this.setRoutes();
    }

    setRoutes(){
        this.app.use("/api/v1/auth" , AuthRouter);
    }

}