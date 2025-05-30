import mongoose from "mongoose";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Cart from "../../models/cartProduct.model.js";
import UserModel from "../../models/user.model.js";


//add product to cart
const addCartItemController = async (req, res) => {
    // Start a MongoDB session to ensure atomicity between multiple operations.
    // This guarantees that both the cart update and user document update succeed together.
    // If any operation fails, all changes will be rolled back to maintain data consistency.
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

        const isExistInCart = await Cart.findOne({ userId, productId }).session(session);
        let response;

        if (isExistInCart) {
            isExistInCart.quantity += 1;
            response = await isExistInCart.save({ session });
        } else {
            const newCartItem = new Cart({ quantity: 1, userId, productId });
            response = await newCartItem.save({ session });

            await UserModel.updateOne(
                { _id: userId },
                { $push: { shoppingCart: productId } },
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            data: response,
            message: "Item added successfully",
            error: false,
            success: true
        });

    } catch (error) {
        console.error("Error in addCartItemController:", error);
        await session.abortTransaction();
        session.endSession();
        return sendErrorResponse(res, "Failed to add item", 500);
    }
}

//get all cartItem
const getAllCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await Cart.find({ userId }).populate('productId');

        return res.status(200).json({
            data: cartItems,
            message: "Success",
            error: false,
            success: true
        })


    } catch (error) {
        console.error("Error in getCartItem:", error);
        return sendErrorResponse(res, "Failed to get cart items", 500);
    }
}

//Update CartItem 
const updateCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if (!productId || typeof quantity !== "number") {
            return sendErrorResponse(res, "Product ID and valid quantity are required", 400);
        }


        if (quantity === 0) {
            const removedCartItem = await Cart.findOneAndDelete({ userId, productId });

            if (removedCartItem) {
                await UserModel.updateOne(
                    { _id: userId },
                    { $pull: { shoppingCart: productId } }
                );

                return res.status(200).json({
                    message: "Item removed from cart",
                    success: true,
                    error: false,
                });
            } else {
                return sendErrorResponse(res, "Cart item not found", 404);
            }
        }

        if (quantity < 1) {
            return sendErrorResponse(res, "Quantity must be at least 1", 400);
        }

        const updateCart = await Cart.findOneAndUpdate(
            { userId, productId },
            { $set: { quantity } },
            { new: true }
        );

        if (!updateCart) {
            return sendErrorResponse(res, "Cart item not found", 404);
        }

        return res.status(200).json({
            data: updateCart,
            message: "Cart item updated successfully",
            success: true,
            error: false
        });
    }
    catch (error) {
        console.error("Error in updateCartItemController:", error);
        return sendErrorResponse(res, "Failed to update cart item", 500);
    }
}

//remove CartItem
const removeCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if (!productId) {
            return sendErrorResponse(res, "Product ID is required", 400);
        }

        const removedItem = await Cart.findOneAndDelete({ userId, productId });

        if (removedItem) {
            await UserModel.updateOne(
                { _id: userId },
                { $pull: { shoppingCart: productId } }
            );

            return res.status(200).json({
                message: "Item removed from cart",
                success: true,
                error: false
            });
        } else {
            return sendErrorResponse(res, "Cart item not found", 404);
        }

    } catch (error) {
        console.error("Error in removeCartItemController:", error);
        return sendErrorResponse(res, "Failed to remove cart item", 500);
    }
};

//Clear Cart
const clearCartController = async (req, res) => {
    try {
        const userId = req.userId;

        await Cart.deleteMany({ userId });

        await UserModel.updateOne(
            { _id: userId },
            { $set: { shoppingCart: [] } }
        );

        return res.status(200).json({
            message: "Cart cleared successfully",
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error in clearCartController:", error);
        return sendErrorResponse(res, "Failed to clear cart", 500);
    }
};



export { addCartItemController, getAllCartItems, updateCartItemController, removeCartItemController, clearCartController}