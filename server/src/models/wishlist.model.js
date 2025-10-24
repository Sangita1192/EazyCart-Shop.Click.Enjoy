import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
},{
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;