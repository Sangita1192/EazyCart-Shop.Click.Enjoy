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
        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "you are not logged In");
        }
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalItems = await Wishlist.countDocuments({ user: userId });
        const wishlists = await Wishlist.find({ user: userId })
            .populate({
                path: "product",
                populate: [
                    { path: "size" },
                    { path: "color" }
                ]
            })
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
const removeProductFromWishlist = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "you are not logged In");
        }

        const isExists = await Wishlist.findOne({ user: userId, product: id })
            .session(session);

        if (!isExists) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "product not in wishlist");
        };

        const removed = await Wishlist.findOneAndDelete({ user: userId, product: id })
            .session(session);

        if (removed) {
            await UserModel.updateOne(
                { _id: userId },
                { $pull: { wishlist: id } },
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
            return sendErrorResponse(res, 404, "Item not found in wishlist");
        }
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in removeFromWishlistController:", error);
        return sendErrorResponse(res, 500, "Failed to remove from wishlist");
    }
};

//clear all wishlist
const clearWishlistController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;

        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return sendErrorResponse(res, 400, "you are not logged In");
        }

        await Wishlist.deleteMany({ user: userId }).session(session);

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
        return sendErrorResponse(res, 500,"Failed to clear wishlist");
    }
};



export { addWishlistController, getWishlistController, removeProductFromWishlist, clearWishlistController }