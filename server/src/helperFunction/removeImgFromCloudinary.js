import {v2 as cloudinary} from 'cloudinary';

const removeImg = async (imgUrl) => {
    try {
        const urlArr = imgUrl.split("/");

        if (urlArr.length < 2 || !imgUrl.includes("cloudinary.com")) {
            return {
                success: false,
                message: "Invalid Cloudinary URL",
                statusCode: 400
            };
        }

        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        if (!imageName) {
            return {
                success: false,
                message: "Invalid image name in URL",
                statusCode: 400
            };
        }

        const result = await cloudinary.uploader.destroy(imageName);

        if (result.result === "ok") {
            return {
                success: true,
                message: "Image successfully removed from Cloudinary",
                statusCode: 200
            };
        } else if (result.result === "not found") {
            return {
                success: false,
                message: "Image not found on Cloudinary",
                statusCode: 404
            };
        } else {
            return {
                success: false,
                message: "Failed to remove image from Cloudinary",
                statusCode: 500
            };
        }
    } catch (error) {
        console.error("Error in removeImg:", error);
        return {
            success: false,
            message: "Internal server error while deleting image",
            statusCode: 500
        };
    }
};


export default removeImg;