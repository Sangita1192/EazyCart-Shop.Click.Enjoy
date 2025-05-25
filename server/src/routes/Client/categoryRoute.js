import express from "express";
import upload from "../../middleware/multer.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, toggleFeaturedCategory, updateCategory } from "../../controllers/Client/categoryController.js";
import auth from "../../middleware/auth.js";

const categoryRoute = express.Router();

categoryRoute.get("/all-categories",auth(["ADMIN"]), getAllCategories);
categoryRoute.post('/create', auth(["ADMIN"]), upload.array('image', 5), createCategory);
categoryRoute.get("/single-category/:id", auth(["ADMIN"]), getCategoryById);
categoryRoute.put("/update/:id", auth(["ADMIN"]), upload.array("image",5), updateCategory);
categoryRoute.delete("/delete/:id", auth(["ADMIN"]), deleteCategory);
categoryRoute.put("/toggle-featured/:id", auth(["ADMIN"]), toggleFeaturedCategory);


export default categoryRoute;