import express from 'express';
import categoryRoute from './Admin/categoryRoute.js';
import productRouter from './Admin/productRouter.js';
import ProductRouterWeb from './Website/ProductRouterWeb.js';
import userRouter from './Website/userRoute.js';
import cartRouterWeb from './Website/cartRouter.js';
import wishlistRouterWeb from './Website/wishlistRouter.js';
import { addressRouterWeb } from './Website/addressRouter.js';
import sizeRouter from './Admin/sizeRouter.js';
import colorRouter from './Admin/colorRouter.js';
import { bannerRouter } from './Admin/bannerRouter.js';
import { categoryRouterWeb } from './Website/categoryRouter.js';
import { bannerRouterWeb } from './Website/bannerRouter.js';
import { reviewRouter } from './Website/reviewRouter.js';
import { paymentRouter } from './Website/paymentRouter.js';
import { orderRouterWeb } from './Website/orderRouter.js';
import { orderRouter } from './Admin/orderRouter.js';
import { dashboardStatsRouter } from './Admin/dashboardStatsRouter.js';

const adminRouter = express.Router();  //handle admin panel routes
const clientRouter = express.Router(); //handle frontend routes


adminRouter.use("/categories", categoryRoute);
adminRouter.use("/products", productRouter);
adminRouter.use("/product-size", sizeRouter);
adminRouter.use("/colors", colorRouter);
adminRouter.use("/banners", bannerRouter);
adminRouter.use("/orders", orderRouter);
adminRouter.use("/dashboard", dashboardStatsRouter);


clientRouter.use("/products", ProductRouterWeb);
clientRouter.use("/cart", cartRouterWeb);
clientRouter.use('/user', userRouter );
clientRouter.use('/wishlist', wishlistRouterWeb );
clientRouter.use('/address', addressRouterWeb );
clientRouter.use('/categories', categoryRouterWeb);
clientRouter.use('/banners', bannerRouterWeb);
clientRouter.use('/reviews', reviewRouter);
clientRouter.use('/payment', paymentRouter);
clientRouter.use('/orders', orderRouterWeb);

export {adminRouter, clientRouter};