import express from 'express';
import { getOrderDetail, getOrders } from '../../controllers/Website/orderController.js';
import auth from '../../middleware/auth.js';

export const orderRouterWeb = express.Router();

orderRouterWeb.get('/', auth(), getOrders);
orderRouterWeb.get('/:orderId', auth(), getOrderDetail);