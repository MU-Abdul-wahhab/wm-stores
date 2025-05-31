// CategoryModel.ts content
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "brands" }],
    name: { type: String, required: [true, "Category Name is Required"] },
    description: { type: String, required: [true, "Category Description is Required"] },
    image: { type: String, required: [true, "Category Image is Required"] },
    isFeatured : {type : Boolean},
    status: { type: Boolean, default: true }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

const Category = mongoose.model("categories", categorySchema);

export default Category;

