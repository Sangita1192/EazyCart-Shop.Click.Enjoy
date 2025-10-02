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
        const { id } = req.params;
        console.log("product id==>", id);

        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "you are not logged In");
        }

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "product need to be selected");
        }
        const isAlreadyWishlisted = await Wishlist.findOne({ user: userId, product: id });

        if (isAlreadyWishlisted) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "Item already in wishlist");
        }

        const newWishlistItem = new Wishlist({
            user: userId,
            product: id
        });
        await newWishlistItem.save({ session });

        await UserModel.updateOne(
            { _id: userId },
            { $addToSet: { wishlist: id } },
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
        return sendErrorResponse(res, 500, "Internal server error");
    }
}

//getAllWishlist
const getWishlistController = async (req, res) => {
    try {
        const userId = req.userId;
        if(!userId) return sendErrorResponse(res, 400, "you are not logged In");
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalItems = await Wishlist.countDocuments({ user:userId });
        const wishlists = await Wishlist.find({ user:userId })
            .populate('product')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalItems / limit);

        return res.status(200).json({
            success: true,
            error: false,
            wishlists,
            totalItems,
            totalPages,
            currentPage: parseInt(page),
        });

    }
    catch (error) {
        console.error("Error in getWishlistController:", error);
        return sendErrorResponse(res, 500, "Failed to fetch wishlist");
    }
}

//remove Item from wishlist
const removeFromWishlistController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userId;
        const { productId } = req.body;

        const removed = await Wishlist.findOneAndDelete({ userId, productId })
            .session(session);

        if (removed) {
            await UserModel.updateOne(
                { _id: userId },
                { $pull: { wishlist: productId } },
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
    catch (error) {
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



export { addWishlistController, getWishlistController, removeFromWishlistController, clearWishlistController }