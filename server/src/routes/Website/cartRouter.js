import express from "express";
import { addCartItemController, clearCartController, getAllCartItems, removeCartItemController, updateCartItemController } from "../../controllers/Website/cartController.js";
import auth from "../../middleware/auth.js";

const cartRouterWeb = express.Router();

cartRouterWeb.get('/',auth(), getAllCartItems);
cartRouterWeb.post('/add',auth(), addCartItemController);
cartRouterWeb.put('/update-cart',auth(), updateCartItemController);
// Remove a specific item from cart
cartRouterWeb.delete('/remove',auth(), removeCartItemController);
// Clear entire cart
cartRouterWeb.delete('/clear',auth(), clearCartController);

export default cartRouterWeb;