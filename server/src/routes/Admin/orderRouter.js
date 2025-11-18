import express from 'express';
import { getAllOrders, getOrder } from '../../controllers/Admin/orderController.js';

export const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);