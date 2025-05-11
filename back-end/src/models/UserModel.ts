import * as mongoose from "mongoose";
import { Utils } from "../utils/Utils";

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: [true, "First Name Is Required"] },
    last_name: { type: String, required: [true, "First Name Is Required"] },
    addresses: [{
        type: mongoose.Types.ObjectId, ref: "Address", required: false
    }],
    email: { type: String, required: [true, "Email Is Required"] },
    email_verified: { type: Boolean, required: true, default: false },
    phone: { type: String, required: [true, "Phone Number Is Required"] },
    phone_verified: { type: Boolean, required: true, default: false },
    password: {
        type: String, required: [true, "Password Is Required"], minlength: [6, "Password must be at least 6 characters"],
        maxlength: [20, "Password must be at most 20 characters"]
    },
    reset_password_token: { type: String, required: false },
    reset_password_token_time: { type: Date, required: false },
    user_role: { type: String, enum: { values: ["admin", "user"], message: "{VALUE} is not a valid user role" }, required: [true, "User Role is required"], default: "user" },
    user_status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "{VALUE} is not a valid status type"
        }
    },
    created_at: { type: Date, required: true, default: Utils.time() },
    updated_at: { type: Date, required: true, default: Utils.time() },
});

const User = mongoose.model("users", userSchema);

export default User;