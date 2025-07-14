import mongoose from "mongoose"
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Wishlist from "../../models/wishlist.model.js";
import UserModel from "../../models/user.model.js";


//add to wishlist
const addWishlistController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if (!productId) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, "Product ID is required", 400);
        }
        const isAlreadyWishlisted = await Wishlist.findOne({ userId, productId });

        if (isAlreadyWishlisted) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, "Item already in wishlist", 400);
        }

        const newWishlistItem = new Wishlist({
            userId,
            productId
        });
        await newWishlistItem.save({ session });

        await UserModel.updateOne(
            { _id: userId },
            { $addToSet: { wishlist: productId } },
            { session }
        );

        await session.commitTransaction();
        await session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Item added to wishlist"
        })

    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return sendErrorResponse(res, "Internal server error", 500)
    }
}

//getAllWishlist
const getWishlistController = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalItems = await Wishlist.countDocuments({ userId });
        const wishlist = await Wishlist.find({ userId })
            .populate('productId')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalItems / limit);

        return res.status(200).json({
            success: true,
            error: false,
            wishlist,
            totalItems,
            totalPages,
            currentPage: parseInt(page),
        });

    }
    catch (error) {
        console.error("Error in getWishlistController:", error);
        return sendErrorResponse(res, "Failed to fetch wishlist", 500);
    }
}

//remove Item from wishlist
const removeFromWishlistController = async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userId = req.userId;
        const {productId} = req.body;

        const removed = await Wishlist.findOneAndDelete({userId, productId})
        .session(session);

        if(removed){
            await UserModel.updateOne(
                {_id: userId},
                {$pull: {wishlist: productId}},
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                success: true,
                error: false,
                message: "Item removed from wishlist",
            });
        } else {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, "Item not found in wishlist", 404);
        }
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error("Error in removeFromWishlistController:", error);
        return sendErrorResponse(res, "Failed to remove from wishlist", 500);
    }
};

//clear all wishlist
const clearWishlistController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        await Wishlist.deleteMany({ userId }).session(session);

        // Clear the user's wishlist array
        await UserModel.updateOne(
            { _id: userId },
            { $set: { wishlist: [] } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Wishlist cleared successfully",
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in clearWishlistController:", error);
        return sendErrorResponse(res, "Failed to clear wishlist", 500);
    }
};



export { addWishlistController, getWishlistController, removeFromWishlistController, clearWishlistController}