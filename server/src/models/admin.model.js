import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "ADMIN"
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const AdminModel = mongoose.model("admin", AdminSchema);
export default AdminModel;
