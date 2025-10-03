import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";

export const AddReview = async (req, res) => {
    try {
        const userId = req.userId;
        const { comment, rating } = req.body;
        const {id} = req.params;

        if (!userId) {
            return sendErrorResponse(res, 400, "you are not logged in");
        }
        if (!comment || !rating || !id) {
            return sendErrorResponse(res, 400, "Missing required fields.");
        }
        const newReview = new Review({
            comment, rating,
            product: id,
            user: userId
        });

        const savedReview = await newReview.save();

        const product = await Product.findById(id);

        if (!product) {
            return sendErrorResponse(res, 404, "Product not found.");
        }

        product.ratings.push(savedReview._id);

        await product.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "review added successfully",
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}
