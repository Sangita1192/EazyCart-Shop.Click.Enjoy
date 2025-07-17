import express from 'express';
import { createProductSize, deleteProductSize, getAllProductSizes, updateProductSize } from '../../controllers/Admin/productSizeController.js';

const sizeRouter = express.Router();

sizeRouter.get('/', getAllProductSizes);
sizeRouter.post('/', createProductSize);
sizeRouter.put('/:id', updateProductSize);
sizeRouter.delete('/', deleteProductSize);

export default sizeRouter;