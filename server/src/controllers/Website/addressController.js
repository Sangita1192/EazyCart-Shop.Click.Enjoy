import mongoose from "mongoose";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import AddressModel from "../../models/address.model.js";
import UserModel from "../../models/user.model.js";

const addAddress = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userId;
        const { address_line, city, state, pincode, country, mobile, address_type } = req.body;

        //userId requried
        if (!userId) {
            await session.abortTransaction();
            return sendErrorResponse(res, "User Id required or User not logged In", 400);
        }

        const newAddress = new AddressModel({
            address_line, city, state, pincode, country, mobile, address_type,
            user_id: userId
        });

        await newAddress.save({ session });

        await UserModel.updateOne(
            { _id: userId },
            { $addToSet: { addressDetail: newAddress._id } },
            { session }
        );
        await session.commitTransaction();
        await session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Address added!"
        })
    }
    catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ errors })
        }
        return sendErrorResponse(res, "Internal server error", 500);
    }
    finally {
        await session.endSession();
    }
}

const getAddressById = async (req, res) => {
    try {
        const { addressIds } = req.body;

        // 🛡 Validate input
        if (!Array.isArray(addressIds) || addressIds.length === 0) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "addressIds must be a non-empty array.",
            });
        }

        const addresses = await AddressModel.find({ _id: { $in: addressIds } });
        res.status(200).json({
            error: false,
            success: true,
            addresses
        })
    }
    catch (error) {
        return sendErrorResponse(res, "internal server error", 500);
    }
}

//fetch all address of User
const getAllAddress = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return sendErrorResponse(res, "User Id required or User not logged In", 400);
        }

        const addresses = await AddressModel.find({ user_id: userId });
        return res.status(200).json({
            error: false,
            success: true,
            addresses
        })
    }
    catch (error) {
        return sendErrorResponse(res, "internal server error", 500);
    }
}

//delete address
const deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        if (!addressId) {
            return sendErrorResponse(res, "Address ID is required", 400);
        }

        const removedAddress = await AddressModel.findOneAndDelete({ _id: addressId });

        if (removedAddress) {
            await UserModel.updateOne(
                { _id: userId },
                { $pull: { addressDetail: addressId } }
            );

            return res.status(200).json({
                message: "address removed successfully",
                success: true,
                error: false
            });
        } else {
            return sendErrorResponse(res, "Address not found", 404);
        }
    }
    catch (error) {
        return sendErrorResponse(res, "internal server error", 500);
    }
}

//updateAddress
const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;
        if (!userId) {
            return sendErrorResponse(res, "user not logged in", 400);
        }

        if (!addressId) {
            return sendErrorResponse(res, "Address ID required", 400);
        }

        const updateFields = {};
        [
            "address_line",
            "city",
            "state",
            "pincode",
            "country",
            "phone",
            "address_type"
        ].forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });

        const updatedAddress = await AddressModel.findOneAndUpdate(
            {_id: addressId, user_id: userId},
            {$set: updateFields},
            {new: true, runValidators: true}
        );

        if(!updatedAddress){
            return sendErrorResponse(res, "Address not found or unauthorized", 404);
        }

        return res.status(200).json({
            success:true,
            error:false,
            message: "Address updated successfully",
            address: updatedAddress
        })
    }
    catch (error) {
        console.error(error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}

export { addAddress, getAllAddress, getAddressById, deleteAddress, updateAddress }