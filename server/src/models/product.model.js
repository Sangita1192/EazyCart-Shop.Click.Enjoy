import mongoose from "mongoose";
import reviewSchema from "./review.model.js";
import slugify from 'slugify';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        {
            type: String,
            required:true,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        set: v => v === "" ? undefined : v
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    is_featured: {
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
    color: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color'
        }
    ],
    size: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Size'
        }
    ],
    weight: {
        type: Number
    },
    view_count: {
        type: Number,
        default: 0
    },
    sold_count: {
        type: Number,
        default: 0
    },
    ratings: [reviewSchema]

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;