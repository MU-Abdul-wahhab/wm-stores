import dotenv from "dotenv";
import moment from "moment-timezone";
import bcrypt from "bcrypt";
import { AppError } from "./AppError";
import crypto from "crypto";
import * as argon2 from 'argon2';
import Multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

const storageOptions = Multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, '..', 'uploads', file.fieldname);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const sanitizedOriginalName = file.originalname.replace(/\s+/g, '_');
        cb(null, `${uniqueSuffix}-${sanitizedOriginalName}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export class Utils {

    public VERIFICATION_TIME = (5 * 60 * 1000);
    public multer = Multer({ storage: storageOptions, fileFilter: fileFilter });

    public static generateToken(digit: number = 16) {
        return crypto.randomBytes(digit).toString('hex');
    }

    public static getOtp(digits: number = 4): string {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return crypto.randomInt(min, max + 1).toString();
    }

    public static configDotenv() {
        dotenv.config({ path: '.env' });
    }

    public static time() {
        return moment().tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");
    }

    public static async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    public static async comparePassword(password: string, encryptedPassword): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(password, encryptedPassword);
            if (!isMatch) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            throw new AppError(err.message, 401);
        }
    }

    public static async encryptRefreshToken(token) {
        return await argon2.hash(token);
    }

    public static async compareRefreshToken(encryptedToken, token): Promise<boolean> {
        return await argon2.verify(encryptedToken, token);
    }

    public static deleteFile(image) {
        const filePath = path.join(__dirname, '..', '..', image);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting the file:', err, image);
            } else {
                console.log('File deleted successfully');
            }
        });
    }

    public static getSearchOptions(query: any, populate: {}, allowedKeyParameter: string[], allowedSortValue: string[], admin: boolean) {

        const invalidKeys = Object.keys(query).filter(key => !allowedKeyParameter.includes(key));
        if (invalidKeys.length > 0) {
            throw new Error(`Invalid query parameter(s): ${invalidKeys.join(", ")}`);
        }

        const sortQuery = query.sort ? query.sort : "created_at";
        const sortFields = sortQuery.split(",");

        const invalidSortFields = sortFields.filter(field => !allowedSortValue.includes(field));
        if (invalidSortFields.length > 0) {
            throw new Error(`Invalid sort field(s): ${invalidSortFields.join(", ")}`);
        }


        const sort: Record<string, 1 | -1> = {};
        sortFields.forEach(field => {
            const order = field.startsWith("-") ? -1 : 1;
            const fieldName = field.replace("-", "");
            sort[fieldName] = order;
        });

        let select = "-__v";

        if (!admin) {
            select += " -created_at -updated_at -created_by -updated_by";
        }

        const options = {
            page: query.page || 1,
            limit: query.limit || 5,
            populate,
            sort,
            select,
        };

        return options;
    }
}