import express from 'express';
import { AddReview} from '../../controllers/Website/reviewController.js';
import {auth} from '../../middleware/auth.js';

export const reviewRouter = express.Router();

reviewRouter.post('/:id', auth(), AddReview);


