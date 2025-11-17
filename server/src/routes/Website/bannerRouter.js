import express from 'express';
import { getCardBanners, getHomeBanners, getMiddleBanners } from '../../controllers/Website/bannerController.js';

export const bannerRouterWeb = express.Router();

bannerRouterWeb.get('/home', getHomeBanners);
bannerRouterWeb.get('/card', getCardBanners);
bannerRouterWeb.get('/middle', getMiddleBanners);