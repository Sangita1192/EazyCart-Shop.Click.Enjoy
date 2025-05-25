import slugify from "slugify";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js"
import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Product from "../../models/product.model.js";

//create Product
const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, category, subcategory, price, stock, discount, color, size, weight, isFeatured } = req.body;

        // Ensure required fields are present
        if (!name || !description || !category  || !price) {
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


export {createProduct}