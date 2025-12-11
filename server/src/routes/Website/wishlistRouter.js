import express from "express";
import {auth} from "../../middleware/auth.js";
import { addWishlistController, clearWishlistController, getWishlistController, removeProductFromWishlist } from "../../controllers/Website/wishlistController.js";

const wishlistRouterWeb = express.Router();

wishlistRouterWeb.get("/", auth(), getWishlistController);
wishlistRouterWeb.post("/:id", auth(), addWishlistController);
wishlistRouterWeb.delete("/clear", auth(), clearWishlistController);
wishlistRouterWeb.delete("/:id", auth(), removeProductFromWishlist);


export default wishlistRouterWeb;