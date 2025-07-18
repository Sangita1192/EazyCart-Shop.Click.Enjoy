import express from "express";
import auth from "../../middleware/auth.js";
import upload from "../../middleware/multer.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../controllers/Admin/productController.js";

const productRouter = express.Router();

productRouter.post('/create', upload.array("images", 5), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/product/:id', auth(["ADMIN"]), getProductById);

productRouter.put('/update/:id', auth(["ADMIN"]),upload.array("images", 5),updateProduct);
productRouter.delete('/delete/:id', auth(["ADMIN"]),deleteProduct);

// productRouter.post('/create', auth(["ADMIN"]), upload.array("images", 5), createProduct);
// productRouter.get('/', auth(["ADMIN"]), getAllProducts);
// productRouter.get('/product/:id', auth(["ADMIN"]), getProductById);

// productRouter.put('/update/:id', auth(["ADMIN"]),upload.array("images", 5),updateProduct);
// productRouter.delete('/delete/:id', auth(["ADMIN"]),deleteProduct);
export default productRouter