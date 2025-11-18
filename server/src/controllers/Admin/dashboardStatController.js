import Order from "../../models/order.model.js";
import UserModel from "../../models/user.model.js";
import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";

export const dashboardStats = async (req, res) => {
    try {
        const [users, products, reviews] = await Promise.all([
            UserModel.countDocuments(),
            Product.countDocuments(),
            Review.countDocuments()
        ]);

        const revenueResult = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$total_amt" } } }
        ]);

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        return res.status(200).json({
            success: true,
            error: false,
            totalUsers: users,
            revenue: totalRevenue,
            totalProducts: products,
            totalReviews: reviews
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}