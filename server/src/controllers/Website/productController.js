import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Product from "../../models/product.model.js";
import Size from "../../models/size.model.js";
import Color from "../../models/color.model.js";


// fetch all products
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', "name")
            .populate('size')
            .populate('color');
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

//fetch top 10 latest products as per categories
export const fetchLatestProducts = async (req, res) => {
    try {
        const products = await Product.find({})
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

// fetch all product sizes
export const fetchAllProductSizes = async (req, res) => {
    try {
        const productSizes = await Size.find({})
        res.status(200).json({
            success: true,
            error: false,
            productSizes
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}

// fetch all product colors
export const fetchAllProductColors = async (req, res) => {
    try {
        const productColors = await Color.find({})
        res.status(200).json({
            success: true,
            error: false,
            productColors
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}

// fetch product detail
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ _id: id })
            .populate("category", "name")
            .populate("size")
            .populate("color")
        res.status(200).json({
            success: true,
            error: false,
            product
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}

// Fetch related products
export const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('category', 'name')
            .populate('color', '_id name')  // assuming color has name
            .populate('size', '_id label'); // assuming size has label

        if (!product) {
            return sendErrorResponse(res, 400, "Product not found");
        }

        const colorIds = product.color.map(c => c._id);
        const sizeIds = product.size.map(s => s._id);

        let relatedProducts = [];
        let moreProducts;

        const products = await Product.find({
            _id: { $ne: id },
            category: product.category._id,
        })
            .populate('category', 'name')
            .populate('color', '_id name')
            .populate('size', '_id label')
            .limit(10);

        const fetchedProductIds = products.map(p => p._id);

        if (products.length < 10) {
            moreProducts = await Product.find({
                _id: { $nin: [...fetchedProductIds, id] },
                $or: [
                    { color: { $in: colorIds } },
                    { size: { $in: sizeIds } },
                ]
            })
                .populate('category', 'name')
                .populate('color', '_id name')
                .populate('size', '_id label')
                .limit(10 - products.length);

        }

        relatedProducts = [...products, ...moreProducts];

        if (relatedProducts.length < 10) {
            const randomProducts = await Product.find({
                _id: { $nin: [...relatedProducts.map(p => p._id), id] },
            })
                .limit(10 - relatedProducts.length);

            relatedProducts = [...relatedProducts, ...randomProducts];
        }

        return res.status(200).json({
            success: true,
            error: false,
            relatedProducts,
        });

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
    }
};



