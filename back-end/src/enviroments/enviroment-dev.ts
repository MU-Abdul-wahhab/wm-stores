import { Enviroment } from "./enviroment";
import {Utils} from "../utils/Utils";

Utils.configDotenv();

export const DevEnviroment : Enviroment = {

    db_url : process.env.DEV_DB_URL

}