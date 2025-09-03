import { createBanner, getAllBanners } from "../../controllers/Admin/bannerController.js";
import express from "express";
import upload from "../../middleware/multer.js";

export const bannerRouter = express();


bannerRouter.post("/new",upload.single('image'), createBanner);
bannerRouter.get("/",getAllBanners);