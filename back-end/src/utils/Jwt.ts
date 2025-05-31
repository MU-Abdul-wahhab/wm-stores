import jwt from "jsonwebtoken";
import { getEnvVariables } from "../enviroments/enviroment";
import { resolve } from "path";
import { AppError } from "./AppError";

export class Jwt {

    static jwtSign(payLoad, expires_in = getEnvVariables().jwt_secret_key_time) {
        return jwt.sign(payLoad, getEnvVariables().jwt_secret_key, {
            expiresIn: expires_in
        })
    }

    static jwtVerify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvVariables().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err)
                } else if (!decoded) {
                    reject(new AppError("Unauthorized Access", 401));
                } else {
                    resolve(decoded);
                }
            })
        })
    }

    static jwtRefreshSign(payLoad, expires_in = getEnvVariables().jwt_secret_refresh_key_time) {
        return jwt.sign(payLoad, getEnvVariables().jwt_secret_refresh_key, {
            expiresIn: expires_in
        })
    }

    static jwtRefreshVerify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvVariables().jwt_secret_refresh_key, (err, decoded) => {
                if (err) {
                    reject(err)
                } else if (!decoded) {
                    reject(new AppError("Unauthorized Access", 401));
                } else {
                    resolve(decoded);
                }
            })
        })
    }

}