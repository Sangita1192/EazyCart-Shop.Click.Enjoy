import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';


export const uploadImageToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      use_filename: true,
      unique_filename: false,
      overwrite: false
    });

    try {
      fs.unlinkSync(localFilePath);
    } catch (err) {
      return {
        success: false,
        error: true,
        message: "Error in deleting file locally" || err.message,
      };

    }
    

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      message: 'Image upload failed'
    };
  }
};
