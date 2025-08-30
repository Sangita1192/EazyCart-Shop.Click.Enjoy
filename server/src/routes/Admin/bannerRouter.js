import { createBanner } from "../../controllers/Admin/bannerController.js";
import express from "express";

export const bannerRouter = express();


bannerRouter.post("/new", createBanner);
