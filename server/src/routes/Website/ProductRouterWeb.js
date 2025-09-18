import express from "express";
import { fetchAllProductColors, fetchAllProducts, fetchAllProductSizes, fetchLatestProducts, fetchPopularProducts } from "../../controllers/Website/productController.js";


const ProductRouterWeb = express.Router();

ProductRouterWeb.get('/',fetchAllProducts);
ProductRouterWeb.get('/popular/:id',fetchPopularProducts );
ProductRouterWeb.get('/latest',fetchLatestProducts );
ProductRouterWeb.get('/colors',fetchAllProductColors );
ProductRouterWeb.get('/sizes',fetchAllProductSizes );

export default ProductRouterWeb;