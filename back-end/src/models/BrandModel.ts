import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const brandSchema = new mongoose.Schema({
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    name: { type: String, required: [true, "Brand Name is Required"] },
    status: { type: Boolean, default: true },
    image: { type: String, required: [true, "Brand Logo is Required"] },
    description: { type: String, required: [true, "Brand Description is Required"] },
    created_by: { type: String },
    updated_by: { type: String },
    __v: { type: Number, select: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
brandSchema.plugin(mongoosePaginate);
const Brand = mongoose.model("brands", brandSchema);

export default Brand;