import express from "express";
import auth from "../../middleware/auth.js";
import upload from "../../middleware/multer.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, toggleFeaturedProduct, updateProduct } from "../../controllers/Admin/productController.js";

const productRouter = express.Router();

productRouter.post('/', upload.array("images", 5), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', upload.array("images", 5),updateProduct);
productRouter.put(`/:id/featured`, toggleFeaturedProduct)



// productRouter.post('/create', auth(["ADMIN"]), upload.array("images", 5), createProduct);
// productRouter.get('/', auth(["ADMIN"]), getAllProducts);
// productRouter.get('/product/:id', auth(["ADMIN"]), getProductById);

// productRouter.put('/update/:id', auth(["ADMIN"]),upload.array("images", 5),updateProduct);
// productRouter.delete('/delete/:id', auth(["ADMIN"]),deleteProduct);
export default productRouter