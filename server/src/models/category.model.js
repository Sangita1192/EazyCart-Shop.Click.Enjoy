import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: [true, "Category name must be unique"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    images: [
        { type: String }
    ],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: "Status must be either 'active' or 'inactive'"
        },
        default: 'active'
    }
}, { timestamps: true });

// Auto-generate slug from name
categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
