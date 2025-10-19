import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String, 
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }, 
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }

});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    subTotal: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Cart", cartSchema);
