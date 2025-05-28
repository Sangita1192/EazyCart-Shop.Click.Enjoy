import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Category from "../../models/category.model.js";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";

//create Category Controller
const createCategory = async (req, res) => {
    try {
        const { name, parent, description, isFeatured, status } = req.body;

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
            isFeatured: isFeatured ?? false,
            status: status ?? "active",
            images: uploadedImageUrls
        });

        await category.save();

        return res.status(201).json({
            message: "Category created successfully",
            error: false,
            success: true,
            category
        })

    }
    catch (error) {
        console.log(error);

        //unique error (like duplicate name)
        if (error?.cause?.code === 11000) {
            return res.status(400).json({
                errors: { name: "Category name must be unique" },
                message: "Validation Error"
            });
        }

        //Schema Validation error
        if (error.name === "ValidationError") {
            const fieldErrors = {};
            for (const field in error.errors) {
                fieldErrors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                errors: fieldErrors,
                message: "Validation Error"
            });
        }

        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//get all categories
const getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", categoryName } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit)

        const query = search ?
            {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ],
            }
            : {};

        //filter by category name
        if (categoryName && categoryName !== "all") {
            query.name = categoryName;
        }

        const totalCategories = await Category.countDocuments(query);

        const categories = await Category.find(query)
            .populate("parent", "name")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })   //newest first


        const totalPages = Math.ceil(totalCategories / limit);

        return res.status(200).json({
            success: true,
            error: false,
            categories,
            totalPages,
            currentPage: page,
            totalItems: totalCategories,
        })

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//get CategoryNameList
const getCategoryList = async (req, res) => {
    try {
        const categories = await Category.find({}, 'name')
            .sort({ name: 1 });
        return res.status(200).json({
            success: true,
            categories
        });
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
            category
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
        let existingImages = req.body.existingImages;
        existingImages = existingImages ? JSON.parse(existingImages) : [];

        const category = await Category.findById(id);
        if (!category) {
            return sendErrorResponse(res, "Category not found", 400);
        }

        // Determine which images to delete (those that existed before but are not in the updated list)
        const imagesToRemove = (category.images || []).filter(oldUrl => !existingImages.includes(oldUrl));

        for (const oldUrl of imagesToRemove) {
            const publicId = extractPublicId(oldUrl);
            await removeImageFromCloudinary(publicId);
        }

        // upload new image files (if any)
        const imageFiles = req.files || [];
        const newImageUrls = [];

        //upload new image(s)
        for (let i = 0; i < imageFiles.length; i++) {
            const result = await uploadImageToCloudinary(imageFiles[i].path);
            if (!result.success) {
                return sendErrorResponse(res, result.message, 500);
            }
            newImageUrls.push(result.url);
        }

        // Final combined image array
        category.images = [...existingImages, ...newImageUrls];

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
            error: false,
            category,
        });

    }
    catch (error) {
        console.log("Error in updateCategory", error);

        //Duplicate key error
        if(error?.cause?.code === 11000){
            return res.status(400).json({
                errors: {name: "Category name must be unique"},
                message: "Validation Error"
            });
        }

        //Mongoose Schema validation errors
        if(error.name === "ValidationError"){
            const fieldErrors = {};
            for (const field in error.errors) {
                fieldErrors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                errors: fieldErrors,
                message: "Validation Error"
            });
        }

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
        if (category.image) {
            for (const url of category.image) {
                const publicId = extractPublicId(url);
                await removeImageFromCloudinary(publicId);
            }
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
        return sendErrorResponse(res, "Failed to update featured category", 500);
    }
}

//toggle Status
const toggleStatusCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }

        //toggle the current value
        category.status = category.status === "active" ? "inactive" : "active";
        await category.save();

        return res.status(200).json({
            message: `Category status updated`,
            success: true,
            error: false,
            category
        });

    }
    catch (error) {
        console.error(error);
        return sendErrorResponse(res, "Failed to update category status", 500);
    }
}







export { createCategory, getCategoryList, getAllCategories, getCategoryById, updateCategory, deleteCategory, toggleFeaturedCategory, toggleStatusCategory }