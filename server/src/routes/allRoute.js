import express from 'express';
import categoryRoute from './Admin/categoryRoute.js';
import productRouter from './Admin/productRouter.js';
import userRouter from './Admin/userRoute.js';

const adminRouter = express.Router();  //handle admin panel routes
const clientRouter = express.Router(); //handle frontend routes

adminRouter.use("/user", userRouter);
adminRouter.use("/categories", categoryRoute);
adminRouter.use("/products", productRouter);



export {adminRouter, clientRouter};