import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
},{
    timestamps: true
});

cartProductSchema.index({ userId: 1, productId: 1 }, { unique: true });


const Cart = mongoose.model('cart', cartProductSchema);

export default Cart;