import express from 'express';
import { getOrders } from '../../controllers/Website/orderController.js';
import auth from '../../middleware/auth.js';

export const orderRouter = express.Router();

orderRouter.get('/orders', auth(), getOrders);