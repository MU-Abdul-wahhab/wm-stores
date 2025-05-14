import { DevEnviroment } from "./enviroment-dev";
import { ProdEnviroment } from "./enviroment-prod";


export interface Enviroment {
    db_url: string,
    gmail_auth : {
        user: string,
        pass: string
    },
    jwt_secret_key : string,
    jwt_secret_refresh_key:string
}

export function getEnvVariables() {

    if (process.env.NODE_ENV === "production") {
        return ProdEnviroment;
    }

    return DevEnviroment;

}