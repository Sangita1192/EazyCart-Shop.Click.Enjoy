import express from 'express';
import { getAllOrders } from '../../controllers/Admin/orderController.js';

export const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);