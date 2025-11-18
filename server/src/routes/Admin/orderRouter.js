import express from 'express';
import { getAllOrders, getOrder, getWeeklyRevenue } from '../../controllers/Admin/orderController.js';

export const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get('/weekly', getWeeklyRevenue);
orderRouter.get("/:id", getOrder);
