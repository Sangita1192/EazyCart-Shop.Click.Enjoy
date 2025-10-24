import express from "express";
import auth from "../../middleware/auth.js";
import { addCartItemController, clearCart, getCart, removeCartItem, updateCartItem } from "../../controllers/Website/cartController.js";

const cartRouterWeb = express.Router();

cartRouterWeb.get('/',auth(), getCart);
cartRouterWeb.post('/',auth(), addCartItemController);
cartRouterWeb.put('/',auth(), updateCartItem);
cartRouterWeb.delete('/clear',auth(), clearCart);
cartRouterWeb.delete('/:itemId',auth(), removeCartItem);


export default cartRouterWeb;