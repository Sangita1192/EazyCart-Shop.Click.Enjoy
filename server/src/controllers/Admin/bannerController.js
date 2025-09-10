import { uploadImageToCloudinary } from "../../utils/Cloudinary/uploadImgCloudinary.js";
import Banner from "../../models/banner.model.js";
import { removeImageFromCloudinary } from "../../utils/Cloudinary/removeImgCloudinary.js";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import extractPublicId from "../../utils/Cloudinary/extractPublicId.js";

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
            return sendErrorResponse(res, 500, `${result.message}`);
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
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
}

//get all banners
export const getAllBanners = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", bannerType } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit)

        const query = search ?
            {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ],
            }
            : {};

        //filter by banner type
        if (bannerType && bannerType !== "all") {
            query.bannerType = bannerType;
        }

        const totalBanners = await Banner.countDocuments(query);

        const banners = await Banner.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })   //newest first


        const totalPages = Math.ceil(totalBanners / limit);

        return res.status(200).json({
            success: true,
            error: false,
            banners,
            totalPages,
            currentPage: page,
            totalItems: totalBanners,
        })
    } catch (error) {
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

// get single banner
export const getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if (!banner) {
            return sendErrorResponse(res, 400, "Banner not found");
        }

        return res.status(200).json({
            success: true,
            error: false,
            banner
        });
    }
    catch (error) {
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
}

// update banner
export const updateBanner = async (req, res) => {
    let uploadImagePublicId;
    try {
        const { id } = req.params;
        const { title, description, link, startDate, endDate, isActive, bannerType, order } = req.body;

        //find existing banner
        const existingBanner = await Banner.findById(id);
        if (!existingBanner) {
            return sendErrorResponse(res, 400, "No banner exists");
        }

        // Handle image update if a new file is uploaded
        if (req.file) {
            const existingImagePublicId = extractPublicId(existingBanner.image);

            // Delete old image from Cloudinary (if exists)
            if (existingImagePublicId) {
                await removeImageFromCloudinary(existingImagePublicId);
            }

            // Upload new image
            const result = await uploadImageToCloudinary(req.file.path);
            if (!result.success) {
                return sendErrorResponse(res, 500, result.message);
            }

            existingBanner.image = result.url;
            uploadImagePublicId = result.public_id;
        }

        // Update other fields
        existingBanner.title = title || existingBanner.title;
        existingBanner.description = description || existingBanner.description;
        existingBanner.link = link || existingBanner.link;
        existingBanner.startDate = startDate || existingBanner.startDate;
        existingBanner.endDate = endDate || existingBanner.endDate;
        existingBanner.isActive = isActive !== undefined ? isActive : existingBanner.isActive;
        existingBanner.bannerType = bannerType || existingBanner.bannerType;
        existingBanner.order = order || existingBanner.order;

        await existingBanner.save();

        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            banner: existingBanner,
        });
    } catch (error) {
        // Remove uploaded image if DB save fails
        if (uploadImagePublicId) {
            await removeImageFromCloudinary(uploadImagePublicId);
        }

        console.error(error);
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
};

//delete banner
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if (!banner) {
            return sendErrorResponse(res, 404, "Banner not found");
        }
        //remove images from cloudinary
        if (banner.image) {
            const publicId = extractPublicId(banner.image);
            await removeImageFromCloudinary(publicId);
        }

        await Banner.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Banner deleted successfully",
            success: true,
            error: false,
        });

    }
    catch (error) {
        return sendErrorResponse(res, 500, "Failed to delete banner");
    }
}

// toggle status between active/InActive of banner
export const toggleStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBanner = await Banner.findById(id);

        if (!existingBanner) return sendErrorResponse(res, 404, "Banner not found");

        const newStatus = !existingBanner.isActive;

        await Banner.findByIdAndUpdate(id, { isActive: newStatus }, { runValidators: true, new: true });

        return res.status(200).json({
            message: "Banner status updated successfully",
            success: true,
            error: false,
        });
    }
    catch (error) {
        return sendErrorResponse(res, 500, "Failed to update banner");
    }
}

