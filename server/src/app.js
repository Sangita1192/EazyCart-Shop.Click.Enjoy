import express from 'express';
import { adminRouter, clientRouter } from './routes/allRoute.js';

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/website", clientRouter);


export default router;



