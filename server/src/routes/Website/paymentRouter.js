import express from 'express';
import { createPaymentSession, verifyPayment } from '../../controllers/Website/paymentController.js';
import auth from '../../middleware/auth.js';

export const paymentRouter = express.Router();

paymentRouter.post('/create-checkout-session',auth(), createPaymentSession);
paymentRouter.post('/verify',auth(), verifyPayment);


