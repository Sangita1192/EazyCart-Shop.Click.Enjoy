import express from "express";
import { getMainCategories } from "../../controllers/Website/categoryController.js";

export const categoryRouterWeb = express.Router();

categoryRouterWeb.get('/', getMainCategories);

