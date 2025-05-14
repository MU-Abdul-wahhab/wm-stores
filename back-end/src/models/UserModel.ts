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
        type: String, required: [true, "Password Is Required"]
    },
    token: { type: String, required: false },
    token_time: { type: Date, required: false },
    user_role: { type: String, enum: { values: ["admin", "user"], message: "{VALUE} is not a valid user role" }, required: [true, "User Role is required"], default: "user" },
    user_status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "{VALUE} is not a valid status type"
        }
    },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model("users", userSchema);

export default User;