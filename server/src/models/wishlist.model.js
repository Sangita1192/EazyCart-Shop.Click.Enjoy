import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
},{
    timestamps: true
});

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });


const Wishlist = mongoose.model('wishlist', wishlistSchema);

export default Wishlist;