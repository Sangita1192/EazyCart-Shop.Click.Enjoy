import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Banner from "../../models/banner.model.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";

//create banner controller
export const createBanner = async (req, res) => {
    let uploadImagePublicId;
    try {
        const { title, description, link, startDate, endDate, isActive, bannerType, order } = req.body;

        const file = req.file;
        if (!file) {
            return sendErrorResponse(res, "No file uploaded", 400);
        }

        const result = await uploadImageToCloudinary(file.path);

        if (!result.success) {
            return sendErrorResponse(res, `${result.message}`, 500)
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
        })

    }
    catch (err) {
        //remove from cloudinary if db saving fails
        if (uploadImagePublicId) {
            await removeImageFromCloudinary(uploadImagePublicId);
        }
        if (err.name === "ValidationError") {
            // Collect all error messages
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}