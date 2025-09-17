import express from "express";
import { fetchLatestProducts, fetchPopularProducts } from "../../controllers/Website/productController.js";

const ProductRouterWeb = express.Router();

ProductRouterWeb.get('/popular/:id',fetchPopularProducts );
ProductRouterWeb.get('/latest',fetchLatestProducts );

export default ProductRouterWeb;