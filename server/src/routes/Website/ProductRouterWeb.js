import express from "express";
import { fetchPopularProducts } from "../../controllers/Website/productController.js";

const ProductRouterWeb = express.Router();

ProductRouterWeb.get('/popular/:id',fetchPopularProducts );

export default ProductRouterWeb;