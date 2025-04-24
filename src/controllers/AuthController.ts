import { Request , Response } from "express";


export class AuthController {

    public static getUser(req : Request , res : Response){
        res.send("Welcome");
       
    }

}