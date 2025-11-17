import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Order from "../../models/order.model.js";

//get orders by particular user
export const getOrders = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return sendErrorResponse(res, 400, 'You are not logged in');
        }

        const orders = await Order.find({ user_id: userId })
            .populate('user_id', 'name email')
            .populate('delivery_address');

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


export const getOrderDetail = async (req, res) => {
    try {
        const userId = req.userId;
        const { orderId } = req.params;
        if (!userId) {
            return sendErrorResponse(res, 400, 'You are not logged in');
        }

        if (!orderId) {
            return sendErrorResponse(res, 400, 'Please provide orderId');
        }

        const order = await Order.findOne({ user_id: userId, _id: orderId })
            .populate('user_id', 'name email')
            .populate('delivery_address')

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
