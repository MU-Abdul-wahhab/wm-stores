import { body } from "express-validator";
import User from "../models/UserModel";


export class AuthValidator {

    static signUp() {
        return [
            body("first_name", "First Name Is Required").isString(),
            body("last_name", "Last Name Is Required").isString(),
            body("email", "Email Is Required").isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then(user => {
                    if (user) return Promise.reject("User is already Exist");
                    return true;
                })
            }),
            body("phone", "Phone Number Is Required").isString().matches(/^07[01245678][0-9]{7}$/).withMessage("Invalid Phone Number"),
            body("password", "Password Is Required").isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage("Password must be between 8-20 Characters"),
        ]
    }

}

