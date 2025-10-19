import mongoose from "mongoose";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Cart from "../../models/cartProduct.model.js";
import Product from "../../models/product.model.js";
import { calculateSubTotal, findCartItemIndex } from "../../utils/cartHelper.js";

//add product to cart
export const addCartItemController = async (req, res) => {
    const userId = req.userId;
    let { productId, quantity, size = null, color = null } = req.body;

    if (!productId || quantity < 1) {
        return sendErrorResponse(res, 400, "Product ID and valid quantity required");
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return sendErrorResponse(res, 404, "Product not found");

        let cart = await Cart.findOne({ user: userId });

        const newItem = {
            product: productId,
            quantity,
            size,
            color,
            price: product.price,
            discount: product.discount
        };

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [newItem],
            });
        } else {
            const index = findCartItemIndex(cart.items, productId, size, color);

            if (index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push(newItem);
            }
        }

        cart.subTotal = await calculateSubTotal(cart.items);
        cart.updatedAt = Date.now();
        await cart.save();

        return res.status(200).json({
            error: false,
            success: true,
            cart
        });

    } catch (error) {
        console.error("Add to Cart Error:", error);
        sendErrorResponse(res, 500, "Internal server error");
    }
};

//get all cartItem
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId })
            .populate({
                path: 'items.product',
                select: 'name description discount price ratings category images',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            });

        if (!cart) {
            return res.status(200).json({
                error: false,
                success: true,
                items: [],
                message: "Cart is empty"
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            cart
        })
    } catch (error) {
        console.error("Get Cart Error:", error);
        sendErrorResponse(res, 500, "Server Error")
    }
}

//Update CartItem 
export const updateCartItem = async (req, res) => {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    if (!itemId) {
        return sendErrorResponse(res, 400, "Invalid: productId and quantity required");
    }
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return sendErrorResponse(res, 404, "Cart not found");

        const index = cart.items.findIndex(item => item._id.toString() === itemId);
        if (index === -1) return sendErrorResponse(res, 404, "Item not found in cart");

        if (quantity < 1) {
            //remove item
            cart.items.splice(index, 1);
        } else {
            cart.items[index].quantity = quantity;
        }

        cart.subTotal = await calculateSubTotal(cart.items);
        cart.updatedAt = Date.now();
        await cart.save();

        return res.status(200).json({
            message: "cart updated",
            success: true,
            error: false,
            cart
        });
    }
    catch (error) {
        console.error("Error in updateCartItemController:", error);
        return sendErrorResponse(res, 500, "Failed to update cart item");
    }
}

//remove CartItem
export const removeCartItem = async (req, res) => {
    const userId = req.userId;
    const { itemId } = req.params;

    if (!itemId) return sendErrorResponse(res, 400, "Item ID is required");

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return sendErrorResponse(res, 404, "Cart not found");

        const index = cart.items.findIndex(item => item._id.toString() === itemId);
        if (index == -1) return sendErrorResponse(res, 404, "item not found");

        cart.items.splice(index, 1);
        cart.subTotal = await calculateSubTotal(cart.items);
        cart.updatedAt = Date.now();
        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            success: true,
            error: false,
            cart
        });
    } catch (error) {
        console.error("Error in removeCartItemController:", error);
        return sendErrorResponse(res, "Failed to remove cart item", 500);
    }
};

//Clear Cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.userId;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) return sendErrorResponse(res, 404, "Cart not exists")

        cart.items = [];
        cart.subTotal = 0;
        cart.updatedAt = new Date();

        await cart.save();

        return res.status(200).json({
            message: "Cart cleared successfully",
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error in clearCart controller:", error);
        return res.status(500).json({
            message: "Failed to clear cart",
            success: false,
            error: true
        });
    }
};
