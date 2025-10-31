import express from 'express';
import { getOrderDetail, getOrders } from '../../controllers/Website/orderController.js';
import auth from '../../middleware/auth.js';

export const orderRouter = express.Router();

orderRouter.get('/', auth(), getOrders);
orderRouter.get('/:orderId', auth(), getOrderDetail);