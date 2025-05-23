import dotenv from "dotenv";
import moment from "moment-timezone";
import bcrypt from "bcrypt";
import { AppError } from "./AppError";
import crypto from "crypto";

export class Utils {

    public VERIFICATION_TIME = (5 * 60 * 1000);

    public static generateToken(digit : number=16){
       return crypto.randomBytes(digit).toString('hex');
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
                throw new AppError("Incorrect password" , 401);
            } else {
                return true;
            }
        } catch (err) {
            throw new AppError(err.message , 401);
        }
    }


}