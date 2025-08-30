import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Banner from "../../models/banner.model.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";

//create banner controller
export const createBanner = async (req, res) => {
    let uploadImagePublicId;
    try {
       const { title, description, link, startDate, endDate, isActive, bannerType, order } = req.body;

        const file = req.file;
        if (!file) {
            return sendErrorResponse(res, 400, "No file uploaded");
        }

        const result = await uploadImageToCloudinary(file.path);

        if (!result.success) {
            return sendErrorResponse(res,500, `${result.message}`);
        }
        const image = result.url;
        uploadImagePublicId = result.public_id;

        const banner = new Banner({
            title,
            description,
            link,
            image,
            startDate,
            endDate,
            isActive,
            bannerType,
            order
        });

        await banner.save();

        return res.status(200).json({
            message: "Banner created successfully",
            error: false,
            success: true,
            banner
        });

    }
    catch (err) {
        console.log(err);
        //remove from cloudinary if db saving fails
        if (uploadImagePublicId) {
            await removeImageFromCloudinary(uploadImagePublicId);
        }

        //Schema Validation error
        if (err.name === "ValidationError") {
            const fieldErrors = {};
            for (const field in err.errors) {
                fieldErrors[field] = err.errors[field].message;
            }
            return res.status(400).json({
                errors: fieldErrors,
                message: "Validation Error"
            });
        }
        return sendErrorResponse(res,500, "Internal Server Error");
    }
}