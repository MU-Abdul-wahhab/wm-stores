import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";


export class AuthController {

    public static async getUser(req: Request, res: Response) {

    }

    public static async signUp(req: Request, res: Response) {

        const { first_name, last_name, email, phone, password } = req.body;
        const token = Utils.generateToken();
       
        const data = {
            first_name,
            last_name,
            email,
            phone,
            password,
            token,
            token_time: Date.now() + new Utils().VERIFICATION_TIME
        }

        const user = await AuthService.signUp(data);

        res.status(200).json({
            user
        })

        await NodeMailer.sendMail({
            to: email,
            subject: "Test",
            html: `<a href="http://${req.hostname}/api/v1/auth/verifyemail?token=${token}&email=${user.email}" target="_blank">Verify My Account</a>`
        });

    }
}