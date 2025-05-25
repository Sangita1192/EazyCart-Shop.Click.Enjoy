import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Category from "../../models/category.model.js";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";

//create Category Controller
const createCategory = async (req, res) => {
    try {
        const { name, parent, description, isFeatured, status } = req.body;

        //check if existing category
        const existing = await Category.findOne({ name });
        if (existing) {
            return sendErrorResponse(res, "Category already exists", 400);
        }

        const imageFiles = req.files || [];
        const uploadedImageUrls = [];

        for (let i = 0; i < imageFiles.length; i++) {
            const result = await uploadImageToCloudinary(imageFiles[i].path);

            if (!result.success) {
                return sendErrorResponse(res, `${result.message}`, 500)
            }

            uploadedImageUrls.push(result.url);
        }

        const category = new Category({
            name,
            parent: parent,
            description,
            isFeatured: isFeatured,
            status: status,
            image: uploadedImageUrls
        });

        await category.save();

        return res.status(201).json({
            message: "Category created successfully",
            error: false,
            success: true,
            image: uploadedImageUrls
        })

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate("parent", "name");
        return res.status(200).json({
            success: true,
            error: false,
            categories,
        })

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//get single category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate("parent", "name");

        if (!category) {
            return sendErrorResponse(res, "Category not found", 400);
        }

        return res.status(200).json({
            success: true,
            error: false,
            category,
        });
    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parent, description, isFeatured, status } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return sendErrorResponse(res, "Category not found", 400);
        }

        // handle new image upload
        const imageFiles = req.files || [];
        const newImageUrls = [];

        if (imageFiles.length > 0) {
            //Remove old images from cloudinary
            for (const oldUrl of category.image) {
                const publicId = extractPublicId(oldUrl);
                await removeImageFromCloudinary(publicId);
            }
        }

        //upload new image(s)
        for (let i = 0; i < imageFiles.length; i++) {
            const result = await uploadImageToCloudinary(imageFiles[i].path);
            if (!result.success) {
                return sendErrorResponse(res, result.message, 500);
            }
            newImageUrls.push(result.url);
        }
        category.image = newImageUrls;

        // Update other fields
        category.name = name || category.name;
        category.parent = parent || category.parent;
        category.description = description || category.description;
        category.isFeatured = isFeatured ?? category.isFeatured;
        category.status = status || category.status;

        await category.save();

        return res.status(200).json({
            message: "Category updated successfully",
            success: true,
            category,
        });

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }
        //remove images from cloudinary
        for (const url of category.image) {
            const publicId = extractPublicId(url);
            await removeImageFromCloudinary(publicId);
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            error: false,
        });

    }
    catch (error) {
        console.error(error);
        return sendErrorResponse(res, "Failed to delete category", 500);
    }
}

//toggle Featured Category
const toggleFeaturedCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }
        
        //toggle the current value
        category.isFeatured = !category.isFeatured;
        await category.save();

        return res.status(200).json({
            message: `Category isFeatured set to ${category.isFeatured}`,
            success: true,
            error: false,
            category
        });

    }
    catch (error) {
        console.error(error);
        return sendErrorResponse(res, "Failed to delete category", 500);
    }
}







export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory, toggleFeaturedCategory }