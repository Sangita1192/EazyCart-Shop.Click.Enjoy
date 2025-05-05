import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    addressLine: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String
    },
    country: {
        type: String,
    },
    mobile: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        default: ""
    }
},
    {
        timestamps: true
});

const AddressModel = mongoose.model('address', AddressSchema);

export default AddressModel;