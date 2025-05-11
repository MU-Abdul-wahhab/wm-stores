import User from "../models/UserModel";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";

export class AuthService {

    public static async signUp(data: any) {

        const { first_name, last_name, email, phone, password, token, token_time } = data;
        const hashPassword = await Utils.encryptPassword(password);
        const user_data = {
            first_name,
            last_name,
            email,
            phone,
            password: hashPassword,
            token,
            token_time
        }
        return await User.create(user_data);

    }

}