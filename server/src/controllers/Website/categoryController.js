import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Category from "../../models/category.model.js";

//get main categories
export const getMainCategories = async (req, res) => {
    try {
        const categories = await Category.find({ parent: null, status: "active" });
        return res.status(200).json({
            success: true,
            error: false,
            categories
        })

    }
    catch (error) {
        return sendErrorResponse(res, 500, "internal server error");
    }
}

