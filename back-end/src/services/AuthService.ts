import User from "../models/UserModel";
import { AppError } from "../utils/AppError";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import { Jwt } from "../utils/Jwt";

export class AuthService {

    public static async sendEmail(to, subject, html) {
        await NodeMailer.sendMail({
            to: to,
            subject: subject,
            html: html
        });
    }

    public static async logIn(data: any) {
        const { email, password } = data;

        const user = await User.findOne({ email: email });

        if (!user) throw new AppError("Invalid Crendtials", 400);

        await Utils.comparePassword(password, user.password);

        const payload = {
            id: user._id,
            email: user.email,
            user_role: user.user_role
        }

        const access_token = Jwt.jwtSign(payload);
        const refresh_token = Jwt.jwtRefreshSign(payload);

        return {
            access_token,
            refresh_token,
            user
        }

    }

    public static async signUp(data: any) {

        const { first_name, last_name, email, phone, password, token, token_time } = data;
        const hashPassword = await Utils.encryptPassword(password);

        await User.findOne({ email: email }).then(user => {
            if (user) throw new AppError("User Already Exist", 400);
        })

        const user_data = {
            first_name,
            last_name,
            email,
            phone,
            password: hashPassword,
            token,
            token_time
        }
        return await User.create(user_data);

    }

    public static async verifyEmail(data: any) {
        const { email, token } = data;

        const user = await User.findOneAndUpdate(
            {
                email: email,
                token: token,
                token_time: { $gt: Date.now() }
            },
            {
                $set: {
                    email_verified: true,
                    updated_at: new Date(),
                },
                $unset: {
                    token: '',
                    token_time: ''
                }
            },
            {
                new: true,
                projection: {
                    password: 0,
                    token: 0,
                    token_time: 0,
                    _v: 0

                }
            }
        )

        if (!user) {
            throw new AppError("Invalid Credentials", 401);
        }

        return user;

    }

    public static async getVerificationEmail(data: any) {
        const { email, password, token, token_time } = data;

        const user = await User.findOne(
            {
                email: email,
            },
        )
        if (!user) {
            throw new AppError("Invalid Credentials", 401);
        }

        if (user.email_verified) {
            throw new AppError("Already verified", 400);
        }
        user.token = token;
        user.token_time = token_time;
        user.save();

        await Utils.comparePassword(password, user?.password);

        return user;

    }

    public static async getNewToken(data : any){
        const refresh_token = data;

        const decoded_data = await Jwt.jwtRefreshVerify(refresh_token);

        if(decoded_data){
            const payload ={
                id : decoded_data._id,
                email : decoded_data.email,
                user_role : decoded_data.user_role
            }

            const access_token = Jwt.jwtSign(payload);
            const refresh_token = Jwt.jwtRefreshSign(payload);

            return {
                access_token,
                refresh_token
            }

        }else{
            throw new AppError("Access Denied" ,401);
        }

    }

}