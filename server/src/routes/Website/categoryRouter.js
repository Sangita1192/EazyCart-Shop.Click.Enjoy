import express from "express";
import { getMainCategories, getSubCategories } from "../../controllers/Website/categoryController.js";

export const categoryRouterWeb = express.Router();

categoryRouterWeb.get('/', getMainCategories);
categoryRouterWeb.get('/subcategory/:id', getSubCategories);

