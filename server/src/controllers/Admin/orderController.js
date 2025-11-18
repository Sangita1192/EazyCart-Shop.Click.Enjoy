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
                path: "products.product_id",
                model: "Product"
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

export const getWeeklyRevenue = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $project: {
                    dayNumber: { $dayOfWeek: "$createdAt" },  // 1=Sun ... 7=Sat
                    revenue: "$total_amt"
                }
            },
            {
                $group: {
                    _id: "$dayNumber",
                    orders: { $sum: 1 },
                    revenue: { $sum: "$revenue" }
                }
            }
        ]);

        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const weeklyRevenue = [1, 2, 3, 4, 5, 6, 7].map(day => {
            const entry = result.find(r => r._id === day);
            return {
                day: dayNames[day-1],
                orders: entry?.orders.toFixed(2) || 0,
                revenue: entry?.revenue.toFixed(2) || 0
            };
        });

        return res.status(200).json({
            success: true,
            error: false,
            weeklyRevenue,
        });
    } catch (err) {
        console.error('Error fetching orders:', err);
        return sendErrorResponse(res, 500, 'Internal server error');
    }
};
