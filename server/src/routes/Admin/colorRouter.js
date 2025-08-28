import express from 'express';
import { createProductColor, getAllColors } from '../../controllers/Admin/productColorController.js';


const colorRouter = express.Router();

colorRouter.post('/new', createProductColor);
colorRouter.get('/', getAllColors);
// sizeRouter.post('/', createProductSize);
// sizeRouter.get('/:id', getProductSize);
// sizeRouter.put('/:id', updateProductSize);
// sizeRouter.delete('/:id', deleteProductSize);


export default colorRouter;