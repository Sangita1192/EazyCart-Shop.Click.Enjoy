import { createBanner, deleteBanner, getAllBanners, getBannerById, toggleStatus, updateBanner } from "../../controllers/Admin/bannerController.js";
import express from "express";
import upload from "../../middleware/multer.js";

export const bannerRouter = express();


bannerRouter.post("/new",upload.single('image'), createBanner);
bannerRouter.get("/",getAllBanners);
bannerRouter.get("/:id", getBannerById);
bannerRouter.put("/:id", upload.single('image'), updateBanner);
bannerRouter.put("/status/:id", toggleStatus);
bannerRouter.delete("/:id", deleteBanner);