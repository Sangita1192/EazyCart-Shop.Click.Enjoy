import express from "express";
import auth from "../../middleware/auth.js";
import { addWishlistController, clearWishlistController, getWishlistController, removeFromWishlistController } from "../../controllers/Website/wishlistController.js";

const wishlistRouterWeb = express.Router();

wishlistRouterWeb.get("/", auth(), getWishlistController);
wishlistRouterWeb.post("/:id", auth(), addWishlistController);
wishlistRouterWeb.delete("/", auth(), removeFromWishlistController);
wishlistRouterWeb.delete("/clear", auth(), clearWishlistController);

export default wishlistRouterWeb;