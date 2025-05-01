import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref : "user"
    },
    orderId: {
        type: String,
        required: [true, "OrderId is required"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    productDetails: {
        name: String,
        image: Array
    },
    paymentId : {
        type: String,
        default: ""
    },
    paymentStatus:{
        type: String,
        default: ""
    },
    deliveryAddress : {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const OrderModel = mongoose.model('order', OrderSchema);

export default OrderModel;