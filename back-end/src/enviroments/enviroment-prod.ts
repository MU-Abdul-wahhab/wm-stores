import {Utils} from "../utils/Utils";
import { Enviroment } from "./enviroment";

Utils.configDotenv();

export const ProdEnviroment : Enviroment = {
    db_url : process.env.PROD_DB_URL as string,
    gmail_auth : {
        user: process.env.PROD_GMAIL_USER as string,
        pass: process.env.PROD_GMAIL_PASS as string
    }
}