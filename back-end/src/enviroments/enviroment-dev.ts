import { Enviroment } from "./enviroment";
import { Utils } from "../utils/Utils";

Utils.configDotenv();

export const DevEnviroment: Enviroment = {

    db_url: process.env.DEV_DB_URL as string,
    gmail_auth: {
        user: process.env.DEV_GMAIL_USER as string,
        pass: process.env.DEV_GMAIL_PASS as string
    },
    jwt_secret_key: process.env.JWT_SECRET_KEY as string,
    jwt_secret_refresh_key: process.env.JWT_SECRET_REFRESH_KEY as string,
    twillio_account_sid: process.env.TWILLIO_ACCOUNT_SID as string,
    twillio_auth_token: process.env.TWILLIO_AUTH_TOKEN as string
}