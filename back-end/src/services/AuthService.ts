import User from "../models/UserModel";
import { AppError } from "../utils/AppError";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import { Jwt } from "../utils/Jwt";
import RefreshToken from "../models/RefreshTokenModel"
import { Twillio } from "../utils/Twillio";

export class AuthService {

    public static async sendEmail(to, subject, html) {
        await NodeMailer.sendMail({
            to: to,
            subject: subject,
            html: html
        });
    }

    public static async logIn(data: any, req) {
        const { email, password } = data;

        const user = await User.findOne({ email: email });

        if (!user) throw new AppError("Invalid Crendtials", 401);
        if (!user.email_verified) throw new AppError("Email Is Not Verified", 403);

        const isCorrect = await Utils.comparePassword(password, user.password);
        if (!isCorrect) throw new AppError("Incorrect Password", 401);

        const existingToken = await RefreshToken.findOne({
            user: user._id,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            expiresAt: { $gt: new Date() }
        });

        const payload = {
            id: user._id,
            email: user.email,
            user_role: user.user_role
        }

        const access_token = Jwt.jwtSign(payload);
        const refresh_token = Jwt.jwtRefreshSign(payload);
        const hashedRefreshToken = await Utils.encryptRefreshToken(refresh_token);

        if (existingToken) {
            existingToken.token = hashedRefreshToken;
            existingToken.save();
        } else {
            const refresh_token_data = {
                user: user._id,
                token: hashedRefreshToken,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }
            await RefreshToken.create(refresh_token_data);
        }

        const userObject = user.toObject();
        delete userObject.password;

        return {
            access_token,
            refresh_token,
            user: userObject
        };

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

        return;

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
        await user.save();

        await Utils.comparePassword(password, user?.password);

        return user;

    }

    public static async getNewToken(data: any, req) {
        const refresh_token = data;

        const decoded_data = await Jwt.jwtRefreshVerify(refresh_token);

        if (decoded_data) {
            const user_refresh_token = await RefreshToken.findOne(
                { user: decoded_data.id, ipAddress: req.ip, userAgent: req.headers['user-agent'] }
            );

            if (!user_refresh_token) throw new AppError("Unauthorized Action", 401);

            const isValidToken = await Utils.compareRefreshToken(user_refresh_token.token, refresh_token);
            if (!isValidToken) {
                throw new AppError("Invalid Refresh Token", 401);
            }
            if (user_refresh_token.userAgent !== req.headers['user-agent']) {
                throw new AppError("Token used from a different browser/device", 401);
            }
            const payload = {
                id: decoded_data.id,
                email: decoded_data.email,
                user_role: decoded_data.user_role
            }

            const access_token = Jwt.jwtSign(payload);
            const new_refresh_token = Jwt.jwtRefreshSign(payload);

            const hashed_refresh_token = await Utils.encryptRefreshToken(new_refresh_token);
            user_refresh_token.token = hashed_refresh_token;
            user_refresh_token.ipAddress = req.ip;
            user_refresh_token.userAgent = req.headers['user-agent'];
            await user_refresh_token.save();

            return {
                access_token,
                refresh_token: new_refresh_token
            }

        } else {
            throw new AppError("Access Denied", 401);
        }

    }

    public static async getPhoneotp(data: any) {
        const email = data;

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new AppError("Access Denied", 401)
        }
        if (user.phone_verified) {
            throw new AppError("Phone Number Already Verified", 403);
        }
        const otp = Utils.getOtp();
        const token_time = Date.now() + new Utils().VERIFICATION_TIME;
        const phone = user.phone;

        await Twillio.sendOtp(otp as string, phone as string);

        user.token = otp;
        user.token_time = token_time;
        await user.save();
        return;
    }

    public static async verifyPhone(data: any) {
        const { email, otp } = data;

        const user = await User.findOneAndUpdate(
            {
                email: email,
                token: otp,
                token_time: { $gt: Date.now() }
            },
            {
                $set: {
                    phone_verified: true,
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
        return;
    }

    public static async getResetOtp(data: String) {
        const email = data;
        const token = Utils.getOtp();
        const token_time = Date.now() + new Utils().VERIFICATION_TIME;

        const user = await User.findOne({ email });

        if (!user) throw new AppError("Invalid Credentials", 401);
        if (!user.email_verified) throw new AppError("Email is not verified yet.", 401);

        user.token = token;
        user.token_time = token_time;
        await user.save();

        return token;
    }

    public static async resetPassword(data) {
        const { new_password, email, otp, current_password } = data;

        const user = await User.findOne({
            email,
            token: otp,
            token_time: { $gt: Date.now() }
        }).select("+password")

        if (!user) throw new AppError("Invalid Or Expired OTP", 401);

        if (current_password) {
            const isValidPassword = await Utils.comparePassword(current_password, user.password);
            if (!isValidPassword) throw new AppError("Invalid Password", 400);
        }

        const isSamePassword = await Utils.comparePassword(new_password, user.password);
        if (isSamePassword) throw new AppError("New Password cannot be same as current password", 400);

        const hashed_password = await Utils.encryptPassword(new_password);

        const updatedUser = await User.findOneAndUpdate(
            {
                email,
                token: otp,
                token_time: {
                    $gt: Date.now()
                }
            },
            {
                $set: {
                    password: hashed_password,
                    updated_at: Date.now(),

                },
                $unset: {
                    token: '',
                    token_time: ''
                }
            },
            {
                new: true,
                projection: {
                    first_name: 1,
                    last_name: 1,
                    email: 1
                }
            }
        )

        if (!updatedUser) throw new AppError("Password Update Failed", 401);
        return updatedUser;
    }

}