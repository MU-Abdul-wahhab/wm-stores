import dotenv from "dotenv";
import moment from "moment-timezone";

export class Utils {

    public static configDotenv() {
        dotenv.config({ path: '.env' });
    }

    public static time() {
        return moment().tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");
    }

}