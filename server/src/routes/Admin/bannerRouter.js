import { createBanner, deleteBanner, getAllBanners, getBannerById, updateBanner } from "../../controllers/Admin/bannerController.js";
import express from "express";
import upload from "../../middleware/multer.js";

export const bannerRouter = express();


bannerRouter.post("/new",upload.single('image'), createBanner);
bannerRouter.get("/",getAllBanners);
bannerRouter.get("/:id", getBannerById);
bannerRouter.put("/:id", upload.single('image'), updateBanner);
bannerRouter.delete("/:id", deleteBanner);