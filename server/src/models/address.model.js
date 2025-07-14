import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        default: "",
        trim: true,
        maxlength: 255,
    },
    city: {
        type: String,
        trim: true,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        trim: true,
        required: [true, "State is required"]
    },
    pincode: {
        type: String,
        trim: true,
        required: [true, "Pincode is required"],
        match: [/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, "Invalid postal code format"]

    },
    country: {
        type: String,
        trim: true,
        default:"Canada"
    },
    phone: {
        type: String,
        default: null
    },
    address_type:{
        type:String,
        default:"home",
        enum:["home", "office"]
    },
    status: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        default: "",
        ref: 'user'
    }
},
    {
        timestamps: true
    });

const AddressModel = mongoose.model('address', AddressSchema);

export default AddressModel;