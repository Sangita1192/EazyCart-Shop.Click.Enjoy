import express from 'express';
import { getCardBanners, getHomeBanners } from '../../controllers/Website/bannerController.js';

export const bannerRouterWeb = express.Router();

bannerRouterWeb.get('/home', getHomeBanners);
bannerRouterWeb.get('/card', getCardBanners);