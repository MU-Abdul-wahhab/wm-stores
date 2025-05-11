import { Enviroment } from "./enviroment";
import {Utils} from "../utils/Utils";

Utils.configDotenv();

export const DevEnviroment : Enviroment = {

    db_url : process.env.DEV_DB_URL as string,
     gmail_auth : {
        user: process.env.DEV_GMAIL_USER as string,
        pass: process.env.DEV_GMAIL_PASS as string
    }

}