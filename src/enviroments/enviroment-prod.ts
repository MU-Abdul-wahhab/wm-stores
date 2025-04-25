import {Utils} from "../utils/Utils";
import { Enviroment } from "./enviroment";

Utils.configDotenv();

export const ProdEnviroment : Enviroment = {
    db_url : process.env.PROD_DB_URL
}