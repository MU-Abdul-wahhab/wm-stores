import * as mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    user : {type : mongoose.Types.ObjectId , ref:"User" , required : [true , "User Id is Required"]},
    address_line_1: { type: String, required: [true, "Address Line 1 is required"] },
    address_line_2: { type: String, required: [true, "Address Line 2 is required"] },
    city: { type: String, required: [true, "City is required"] },
    postal_code: { type: String, required: [true, "Postal Code is required"] },
    province: { type: String, required: [true, "Province is required"] },
    district: { type: String, required: [true, "District is required"] },
    address_type: {
        type: String, required: [true, "Address Type Is Required"], enum: {
            values: ["shipping_address", "billing_address"],
            message : "{VALUE} is not valid"
        }
    }
})

const Address  = mongoose.model("Address" , addressSchema);

export default Address;