import { Router } from "express";



class AdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }

    private getRoutes() {
        
    }
    private postRoutes() {

    }

}

export default new AdminRouter().router;