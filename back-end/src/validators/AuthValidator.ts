import { body, query } from "express-validator";
import { AppError } from "../utils/AppError";

export class AuthValidator {

    static signUp() {
        return [
            body("first_name", "First Name Is Required").notEmpty().isString(),
            body("last_name", "Last Name Is Required").notEmpty().isString(),
            body("email", "Email Is Required").notEmpty().isEmail(),
            body("phone", "Phone Number Is Required").notEmpty().isString().matches(/^07[01245678][0-9]{7}$/).withMessage("Invalid Phone Number"),
            body("password", "Password Is Required").notEmpty().isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage("Password must be between 8-20 Characters"),
        ]
    }

    static verifyEmail() {
        return [
            query("email", "Email Is Required").notEmpty().isEmail(),
            query("token", "Token Is Required").notEmpty().isAlphanumeric(),
        ]
    }

    static getVerificationEmail() {
        return [
            body("email", "Email Is Required").isEmail().notEmpty(),
            body("password", "Password Is Required").notEmpty()
        ]
    }

    static logIn() {
        return [
            body("email", "Email Is Required").isEmail(),
            body("password", "Password Is Required").notEmpty()
        ]
    }

    static getNewToken() {
        return [
            body("refresh_token")
                .notEmpty()
                .isString()
                .withMessage("Refresh Token is required")
                .isJWT().withMessage("Invalid token format")

        ]
    }

    static verifyPhone() {
        return [
            query("otp", "OTP Is Required").isAlphanumeric().notEmpty(),
        ]
    }

    static resetPassword() {
        return [
            body("current_password").optional().isString().notEmpty()
                .withMessage("Current Password is required"),
            body("new_password", "New Password Is Required").notEmpty().isAlphanumeric()
                .isLength({ min: 8, max: 20 })
                .withMessage("Password must be between 8-20 Characters"),
            body("confirm_new_password", "Confirmation Password Is Required").notEmpty()
                .custom((value, { req }) => {
                    if (value !== req.body.new_password) {
                        throw new AppError("Password does not match", 400)
                    }
                    return true
                }),
            body("otp")
                .notEmpty().withMessage("OTP is required")
                .isNumeric().withMessage("OTP must be numeric")
        ]
    }


}

