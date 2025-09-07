import mongoose from "mongoose";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Product from "../../models/product.model.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";

//create Product
const createProduct = async (req, res) => {
    let uploadedImageUrls;
    try {
        const { name, description, category, sub_category, price, stock, discount, color, size, is_featured } = req.body;

        console.log(req.files);
        const imageFiles = req.files || [];
        uploadedImageUrls = [];

        for (let file of imageFiles) {
            const result = await uploadImageToCloudinary(file.path);
            if (!result.success) {
                return sendErrorResponse(res, 500, result.message);
            }
            uploadedImageUrls.push({
                url: result.url,
                public_id: result.public_id
            });
        }

        const product = new Product({
            name,
            description,
            images: uploadedImageUrls.map((img) => img.url),
            category,
            sub_category,
            price,
            stock: stock || 0,
            discount: discount || 0,
            size: size || [],
            color: color || [],
            is_featured,
        });

        await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product,
        });

    }
    catch (error) {
        // Remove uploaded images from Cloudinary if save fails
        for (let img of uploadedImageUrls) {
            await removeImageFromCloudinary(img.public_id);
        }

        console.error('Error creating product:', error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
};

//get all products
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", categoryId } = req.query;
        console.log(req.query.categoryId);

        const skip = (parseInt(page) - 1) * parseInt(limit)

        const query = search ?
            {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ],
            }
            : {};

        //filter by category or sub_category
        if (categoryId) {
            if (categoryId) {
                query.$or = query.$or ? [...query.$or, { category: categoryId }, { sub_category: categoryId }]
                    : [{ category: categoryId }, { sub_category: categoryId }];
            }
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .populate("category", "name")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })   //newest first


        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            success: true,
            error: false,
            products,
            totalPages,
            currentPage: page,
            totalItems: totalProducts,
        });
    }
    catch (error) {
        console.error('Error fetching products', error);
        return sendErrorResponse(res, 500, "Internal server error");
    }
}

//get product by Id
const getProductById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendErrorResponse(res, "Invalid Product Id format", 400)
    }
    try {
        const product = await Product.findById(id)
            .populate("category", "name")
            .populate('subcategory')
            .populate("size")
            .populate('color')
        if (!product) {
            return sendErrorResponse(res, "Product not found", 404);
        }
        product.viewCount += 1;
        await product.save();
        return res.status(200).json({
            product,
            error: false,
            success: true
        })

    }
    catch (error) {
        console.error('Error fetching product', error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}

//update product 
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendErrorResponse(res, "Invalid Product Id format", 400)
    }
    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return sendErrorResponse(res, "Product not found", 404);
        }

        const {
            name,
            description,
            category,
            subcategory,
            price,
            stock,
            discount,
            color = [],
            size = [],
            weight,
            isFeatured
        } = req.body;

        // handle new image upload
        const files = req.files || [];
        const uploadedImageUrls = [];

        if (files.length > 0) {
            //Remove old images from cloudinary
            for (const oldUrl of existingProduct.images) {
                const publicId = extractPublicId(oldUrl);
                await removeImageFromCloudinary(publicId);
            }
        }

        //upload new image(s)
        for (let i = 0; i < files.length; i++) {
            const result = await uploadImageToCloudinary(files[i].path);
            if (!result.success) {
                return sendErrorResponse(res, result.message, 500);
            }
            uploadedImageUrls.push(result.url);
        }
        existingProduct.images = uploadedImageUrls;

        // Update other fields
        if (name) existingProduct.name = name;
        if (description) existingProduct.description = description;
        if (category) existingProduct.category = category;
        if (subcategory) existingProduct.subcategory = subcategory;
        if (price !== undefined) existingProduct.price = price;
        if (stock !== undefined) existingProduct.stock = stock;
        if (discount !== undefined) existingProduct.discount = discount;
        if (color.length) existingProduct.color = color;
        if (size.length) existingProduct.size = size;
        if (weight !== undefined) existingProduct.weight = weight;
        if (typeof isFeatured === 'boolean') existingProduct.isFeatured = isFeatured;

        await existingProduct.save();

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            existingProduct,
        });

    }
    catch (error) {
        console.error('Error fetching product', error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendErrorResponse(res, "Invalid Product Id format", 400)
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return sendErrorResponse(res, "Product not found", 404);
        }
        //remove images from cloudinary
        for (const url of product.images) {
            const publicId = extractPublicId(url);
            await removeImageFromCloudinary(publicId);
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            error: false,
        });

    }
    catch (error) {
        console.error('Error fetching products', error);
        return sendErrorResponse(res, "Internal server error", 500);
    }

}

//get featured Products
const getFeaturedProducts = async (req, res) => {
    try {
        const featured = await Product.find({ isFeatured: true })
            .populate("category", "name")
            .populate("subcategory", "name")
            .populate("size", "name")
            .populate("color", "name");

        return res.status(200).json({
            products: featured,
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error fetching featured products", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
};

//searched & Filter Products products
const searchAndFilterProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sortBy, order = 'asc', page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .populate("category", "name")
            .populate("subcategory", "name")
            .populate("size", "name")
            .populate("color", "name")
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        return res.status(200).json({
            products,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error filtering products", error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
};


export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }