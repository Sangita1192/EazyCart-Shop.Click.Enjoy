import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: null
    },
    accessToken: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
    verifyEmail: {
        type: Boolean,
        default: false
    },
    lastLoginDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    addressDetail: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address'
        }
    ],
    shoppingCart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'cart'
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'cart'
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    otp: {
        type: Number,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});


const UserModel = mongoose.model('user', UserSchema);

export default UserModel;