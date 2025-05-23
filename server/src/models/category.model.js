import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  //automatically remove leading and tailing space
        unique: true
    },
    image: [
        { type: String }
    ],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    description: {
        type: String,
        trim: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
},
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;