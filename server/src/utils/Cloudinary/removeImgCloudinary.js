import { v2 as cloudinary } from 'cloudinary';

export const removeImageFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    return { success: false, message: "Failed to delete image from Cloudinary" };
  }
};
