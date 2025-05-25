import mongoose from "mongoose";
import reviewSchema from "./review.model.js";
import slugify from 'slugify';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    images: [
        {
            type: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        // required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100 // percentage discount
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",

    },
    weight: {
        type: Number
    },
    viewCount: {
        type: Number,
        default: 0
    },
    soldCount: {
        type: Number,
        default: 0
    },
    ratings: [reviewSchema]

}, { timestamps: true });


// Middleware to generate slug from name before saving
productSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;