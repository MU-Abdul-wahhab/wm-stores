import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError";
import { Jwt } from "../utils/Jwt";
import User from "../models/UserModel";
import { Utils } from "../utils/Utils";

export class GlobalMiddleware {
    static checkError(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty() && req.file) {
            const image = `/src/uploads/${req.file.fieldname}/${req.file.filename}`;
            Utils.deleteFile(image);
        }
        if (!errors.isEmpty()) {
            next(new AppError(errors.array()[0].msg, 403))
        } else {
            next();
        }
    }

    static async auth(req, res, next) {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) return next(new AppError("User Not Logged In", 401));

        const decoded = await Jwt.jwtVerify(token);

        const user = await User.findOne({ email: decoded.email })

        if (!user) return next(new AppError("Unauthorized Access", 401));

        req.user = decoded;
        next();

    }

    static checkRole(role: string) {
        return (req, res, next) => {
            const user = req.user;
            if (user.user_role != role) {
                next(new AppError('Your an Unauthorized user', 401));
            }
            next();
        }

    }

    static parseJSON(field: string) {
        return (req, res, next) => {
            if (Array.isArray(req.body[field])) {
                try {
                    req.body[field] = req.body[field].map(value => JSON.parse(value));
                    console.log(req.body[field]);
                } catch (err) {
                    return res.status(400).json({ message: "Invalid specs format" });
                }
            }
            next();
        }
    }
}