import slugify from "slugify";
import mongoose from "mongoose";
import Category from '../../models/category.model.js';
import Size from '../../models/size.model.js';
import Color from '../../models/color.model.js';
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Product from "../../models/product.model.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";

//create Product
const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, category, subcategory, price, stock, discount, color, size, weight, isFeatured } = req.body;

        // Ensure required fields are present
        if (!name || !description || !category || !price) {
            return res.status(400).json({ message: 'Required fields missing' });
        };

        // Upload images to Cloudinary
        const files = req.files || [];
        const uploadedImageUrls = [];

        for (let i = 0; i < files.length; i++) {
            const result = await uploadImageToCloudinary(files[i].path);

            if (!result.success) {
                return sendErrorResponse(res, `${result.message}`, 500)
            }

            uploadedImageUrls.push(result.url);
        }

        //create slug
        const slug = slugify(name, { lower: true, strict: true });

        const product = new Product({
            name,
            description,
            slug,
            images: uploadedImageUrls,
            category,
            subcategory,
            price,
            stock,
            discount,
            color,
            size,
            weight,
            isFeatured,
        });

        await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product,
        });

    }
    catch (error) {
        console.error('Error creating product:', error);
        return sendErrorResponse(res, "Internal server error", 500);
    }
};

//get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name")
            .populate('subcategory')
            .populate("size")
            .populate('color')
        return res.status(200).json({
            products,
            error: false,
            success: true
        })

    }
    catch (error) {
        console.error('Error fetching products', error);
        return sendErrorResponse(res, "Internal server error", 500);
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