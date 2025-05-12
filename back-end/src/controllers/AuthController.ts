import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { Utils } from "../utils/Utils";



export class AuthController {

    public static async logIn(req: Request, res: Response) {

        const { email, password } = req.body;
        const data = {
            email,
            password
        }

        const response = await AuthService.logIn(data);

        res.status(201).json({
            status: 'success',
            message: 'Successfully Logged In',
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            user: response.user

        });
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
            status: "success",
            message: "Verification Email Has Been Sent Your Email"
        });

        const html = `<a href="http://${req.hostname}:3000/api/v1/auth/verify/email?email=${user.email}&token=${token}" target="_blank">Verify My Account</a>`;

        await AuthService.sendEmail(user.email, "Email Verification", html);

    }

    public static async verifyEmail(req: Request, res: Response) {
        const { email, token } = req.query;
        const data = {
            email,
            token
        }

        const verifiedUser = await AuthService.verifyEmail(data);

        res.status(201).json({
            status: 'success',
            message: 'Email Has Verified',
            verifiedUser
        })
    }

    public static async getVerificationEmail(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = Utils.generateToken();
        const token_time = Date.now() + new Utils().VERIFICATION_TIME;


        const data = {
            email,
            password,
            token,
            token_time
        }

        await AuthService.getVerificationEmail(data);

        res.status(200).json({
            status: "success",
            message: "Verification Email Has Been Sent Your Email"
        });

        const html = `<a href="http://${req.hostname}:3000/api/v1/auth/verify/email?email=${email}&token=${token}" target="_blank">Verify My Account</a>`;

        await AuthService.sendEmail(email, "Email Verification", html);

    }

    public static async getNewToken(req: Request, res: Response) {
        const { access_token, refresh_token } = await AuthService.getNewToken(req.body.refresh_token);

        res.status(201).json({
            access_token,
            refresh_token
        })
    }
}