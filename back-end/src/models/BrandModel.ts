import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    name: { type: String, required: [true, "Brand Name is Required"] },
    status: { type: Boolean, default: true },
    logo: { type: String, required: [true, "Brand Logo is Required"] },
    description: { type: String, required: [true, "Brand Description is Required"] },
    created_by: { type: String }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Brand = mongoose.model("brands", brandSchema);

export default Brand;