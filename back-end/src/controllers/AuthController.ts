import { AuthService } from "../services/AuthService";
import { Utils } from "../utils/Utils";

export class AuthController {

    public static async logIn(req, res) {

        const { email, password } = req.body;
        const data = {
            email,
            password
        }

        const response = await AuthService.logIn(data, req);

        res.status(201).json({
            status: 'success',
            message: 'Successfully Logged In',
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            user: response.user

        });
    }

    public static async signUp(req, res) {

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

    public static async verifyEmail(req, res) {
        const { email, token } = req.query;
        const data = {
            email,
            token
        }

        await AuthService.verifyEmail(data);

        res.status(201).json({
            status: 'success',
            message: 'Email Has Verified',

        })
    }

    public static async getVerificationEmail(req, res) {
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

    public static async getNewToken(req, res) {
        const { access_token, refresh_token } = await AuthService.getNewToken(req.body.refresh_token, req);

        res.status(201).json({
            access_token,
            refresh_token
        })
    }

    public static async getPhoneotp(req, res) {
        const { email } = req.user;

        await AuthService.getPhoneotp(email);


        res.status(201).json({
            status: "success",
            message: "OTP has sent to your phone number"
        })

    }

    public static async verifyPhone(req, res) {
        const otp = req.query.otp;
        const email = req.user.email;
        const data = {
            email,
            otp
        }

        await AuthService.verifyPhone(data);

        res.status(201).json({
            status: 'success',
            message: 'Phone Number Has Verified',
        })
    }
}