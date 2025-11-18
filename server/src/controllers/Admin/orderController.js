import Order from "../../models/order.model.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user_id")
            .populate("delivery_address")
            .populate(
                {path:"products.product_id",
                model:"product"}
            );
        return res.status(200).json({
            success: true,
            error: false,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return sendErrorResponse(res, 500, 'Internal server error');
    }
};