import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

const specSchema = new mongoose.Schema({
    field: { type: String, required: true, unique: true },
    type: {
        type: String, required: true,
        enum: ["string", "number", "boolean"],
    },
    required: { type: Boolean, default: true },
    unit_required: { type: Boolean, required: true },
    unit: {
        type: String,
        trim: true,
        uppercase: true,
    },
});

specSchema.pre("validate", function (next) {
    if (this.unit_required && (!this.unit || this.unit.trim() === "")) {
        this.invalidate("unit", "Unit is required as per unit_required setting");
    }
    if (!this.unit_required && this.unit && this.unit.trim() !== "") {
        this.invalidate("unit", "Unit should be empty when unit_required is false");
    }
    next();
});

const categorySchema = new mongoose.Schema({
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "brands" }],
    name: { type: String, required: [true, "Category Name is Required"] },
    description: { type: String, required: [true, "Category Description is Required"] },
    image: { type: String, required: [true, "Category Image is Required"] },
    isFeatured: { type: Boolean },
    status: { type: Boolean, default: true },
    specs: [specSchema]
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

categorySchema.pre("save", async function (next) {

    if (this.isModified("isFeatured") && this.isFeatured) {
        const count = await Category.countDocuments({
            isFeatured: true,
            _id: { $ne: this._id }
        });

        if (count >= 3) {
            return next(new AppError("Maximum of 2 featured categories allowed", 401));
        }
    }

    next();

});

const Category = mongoose.model("categories", categorySchema);

export default Category;

