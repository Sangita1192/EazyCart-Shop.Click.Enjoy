import Order from "../../models/order.model.js";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user_id")
            .populate("delivery_address")
            .populate(
                {
                    path: "products.product_id",
                    model: "Product"
                }
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

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return sendErrorResponse(res, 400, 'Invalid orderId');
        }

        const order = await Order.findOne({ _id: id })
            .populate('user_id')
            .populate('delivery_address')
            .populate({
                path:"products.product_id",
                model:"Product"
            })

        return res.status(200).json({
            success: true,
            error: false,
            order,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return sendErrorResponse(res, 500, 'Internal server error');
    }
}