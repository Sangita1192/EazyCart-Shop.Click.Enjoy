import express from 'express';
import { getHomeBanners } from '../../controllers/Website/bannerController.js';

export const bannerRouterWeb = express.Router();

bannerRouterWeb.get('/home', getHomeBanners)