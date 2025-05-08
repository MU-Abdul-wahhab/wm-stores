import { DevEnviroment } from "./enviroment-dev";
import { ProdEnviroment } from "./enviroment-prod";


export interface Enviroment {
    db_url: string,
}

export function getEnvVariables() {

    if (process.env.NODE_ENV === "production") {
        return ProdEnviroment;
    }

    return DevEnviroment;

}