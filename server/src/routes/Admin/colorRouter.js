import express from 'express';
import { createProductColor, deleteColor, getAllColors, getColor, updateColor } from '../../controllers/Admin/productColorController.js';


const colorRouter = express.Router();

colorRouter.post('/new', createProductColor);
colorRouter.get('/', getAllColors);
colorRouter.get('/:id', getColor);
colorRouter.put('/:id', updateColor);
colorRouter.delete('/:id', deleteColor);


export default colorRouter;