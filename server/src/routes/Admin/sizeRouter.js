import express from 'express';
import { createProductSize, deleteProductSize, getAllProductSizes, updateProductSize, getProductSize } from '../../controllers/Admin/productSizeController.js';

const sizeRouter = express.Router();

sizeRouter.get('/', getAllProductSizes);
sizeRouter.post('/', createProductSize);
sizeRouter.get('/:id', getProductSize);
sizeRouter.put('/:id', updateProductSize);
sizeRouter.delete('/:id', deleteProductSize);


export default sizeRouter;