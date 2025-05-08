import { Request , Response } from "express";


export class AuthController {

    public static getUser(req : Request , res : Response){
 
        res.status(200).json({
            message : "Welcome"
        })
       
    }

}