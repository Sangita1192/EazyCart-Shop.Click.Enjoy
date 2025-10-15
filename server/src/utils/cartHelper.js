import Product from "../models/product.model.js";

export const calculateSubTotal = async (items) => {
    let total = 0;
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    return total;
};

export const findCartItemIndex = (items, productId, size = null, color = null) => {
    return items.findIndex(item =>
        item.product.toString() === productId &&
        (item.size || null) === (size || null) &&
        (item.color || null) === (color || null)
    );
};