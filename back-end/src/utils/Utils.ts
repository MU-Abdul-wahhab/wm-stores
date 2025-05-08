import dotenv from "dotenv";

export class Utils {

    public static configDotenv() {
        dotenv.config({ path: '.env' });
    }

}