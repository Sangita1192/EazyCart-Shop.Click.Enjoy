import express from 'express';
import categoryRoute from './Admin/categoryRoute.js';
import productRouter from './Admin/productRouter.js';
import ProductRouterWeb from './Website/ProductRouterWeb.js';
import userRouter from './Website/userRoute.js';
import cartRouterWeb from './Website/cartRouter.js';
import wishlistRouterWeb from './Website/wishlistRouter.js';
import { addressRouterWeb } from './Website/addressRouter.js';

const adminRouter = express.Router();  //handle admin panel routes
const clientRouter = express.Router(); //handle frontend routes


adminRouter.use("/categories", categoryRoute);
adminRouter.use("/products", productRouter);


clientRouter.use("/products", ProductRouterWeb);
clientRouter.use("/cart", cartRouterWeb);
clientRouter.use('/user', userRouter );
clientRouter.use('/wishlist', wishlistRouterWeb );
clientRouter.use('/address', addressRouterWeb );



export {adminRouter, clientRouter};