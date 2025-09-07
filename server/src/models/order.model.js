import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    order_id: {
        type: String,
        required: [true, "OrderId is required"],
        unique: true
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true,
            },
            product_details: {
                name: { type: String, required: true },
                image: { type: [String], default: [] },
            },
        }],
    payment_id: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: "pending",
        enum: ["pending", "paid", "failed", "refunded"]
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    tax_amt: {
        type: Number,
        default: 0,
    },

    discount_amt: {
        type: Number,
        default: 0,
    },

    shipping_fee: {
        type: Number,
        default: 0,
    },

    total_amt: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

const OrderModel = mongoose.model('order', OrderSchema);

export default OrderModel;