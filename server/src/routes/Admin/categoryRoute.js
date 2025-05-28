import express from "express";
import upload from "../../middleware/multer.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryList, toggleFeaturedCategory, toggleStatusCategory, updateCategory } from "../../controllers/Admin/categoryController.js";
import auth from "../../middleware/auth.js";
const categoryRoute = express.Router();

// categoryRoute.get("/",auth(["ADMIN"]), getAllCategories);
// categoryRoute.post('/category', auth(["ADMIN"]), upload.array('image', 5), createCategory);
// categoryRoute.get("/category/:id", auth(["ADMIN"]), getCategoryById);
// categoryRoute.put("/category/:id", auth(["ADMIN"]), upload.array("image",5), updateCategory);
// categoryRoute.delete("/category/:id", auth(["ADMIN"]), deleteCategory);
// categoryRoute.put("/toggle-featured/:id", auth(["ADMIN"]), toggleFeaturedCategory);

categoryRoute.get("/", getAllCategories);
categoryRoute.get("/category/list", getCategoryList);
categoryRoute.post('/category', upload.array('images', 5), createCategory);
categoryRoute.get("/category/:id", getCategoryById);
categoryRoute.put("/category/:id", upload.array("images",5), updateCategory);
categoryRoute.delete("/category/:id", deleteCategory);
categoryRoute.patch("/featured/:id", toggleFeaturedCategory);
categoryRoute.patch("/status/:id", toggleStatusCategory);


export default categoryRoute;