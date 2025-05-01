import express from 'express';
import userRouter from './Client/userRoute.js';


const adminRouter = express.Router();  //handle admin panel routes
const clientRouter = express.Router(); //handle frontend routes

adminRouter.use("/user", userRouter);



export {adminRouter, clientRouter};