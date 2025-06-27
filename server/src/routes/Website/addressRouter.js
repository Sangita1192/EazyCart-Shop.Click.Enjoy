import express from "express";
import auth from "../../middleware/auth.js";
import { addAddress, getAllAddress } from "../../controllers/Website/addressController.js";


export const addressRouterWeb = express.Router();

addressRouterWeb.post('/', auth(),addAddress);
addressRouterWeb.get('/', auth(), getAllAddress);


