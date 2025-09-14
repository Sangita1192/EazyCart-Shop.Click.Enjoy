import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Product from "../../models/product.model.js";

// fetch top 8 popular products as per categories
export const fetchPopularProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ category: id })
            .populate('category', "name")
            .populate('size')
            .populate('color')
            .sort({ view_count: -1 })
            .limit(10);
        res.status(200).json({
            success: true,
            error: false,
            products
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}