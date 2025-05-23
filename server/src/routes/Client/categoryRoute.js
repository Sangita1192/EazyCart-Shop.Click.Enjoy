import express from "express";
import upload from "../../middleware/multer.js";
import { createCategory } from "../../controllers/Client/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.post('/create', upload.array('image', 5), createCategory)


export default categoryRoute;