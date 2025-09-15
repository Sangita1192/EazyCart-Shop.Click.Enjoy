import Banner from "../../models/banner.model.js";

// get home slider Banner
export const getHomeBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ bannerType: "slider", isActive: true });
        return res.status(200).json({
            success: true,
            error: false,
            banners
        })

    }
    catch (error) {
        return sendErrorResponse(res, 500, "internal server error");
    }
}