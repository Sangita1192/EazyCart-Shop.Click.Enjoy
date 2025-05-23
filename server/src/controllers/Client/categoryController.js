//create Category Controller

import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import Category from "../../models/category.model.js";
import { uploadImageToCloudinary } from "../../utils/uploadImgCloudinary.js";

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
            message:"Category created successfully",
            error:false,
            success:true,
            image: uploadedImageUrls
        })

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}


export {createCategory}