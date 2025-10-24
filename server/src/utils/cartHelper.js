import Product from "../models/product.model.js";

export const calculateSubTotal = async (items) => {
    let total = 0;

    for (const item of items) {
        const price = item.price;
        const discount = item.discount;
        const discountedPrice = price * (1 - discount / 100);
        total += discountedPrice * item.quantity;
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