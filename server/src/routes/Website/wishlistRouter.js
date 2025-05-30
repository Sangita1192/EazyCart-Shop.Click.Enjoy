import express from "express";
import auth from "../../middleware/auth.js";
import { addWishlistController, clearWishlistController, getWishlistController, removeFromWishlistController } from "../../controllers/Website/wishlistController.js";

const wishlistRouterWeb = express.Router();

// Add a product to wishlist
wishlistRouterWeb.post("/add", auth(), addWishlistController);

// Remove a product from wishlist
wishlistRouterWeb.delete("/remove", auth(), removeFromWishlistController);

// Get all wishlist items
wishlistRouterWeb.get("/all", auth(), getWishlistController);

// Clear entire wishlist
wishlistRouterWeb.delete("/clear", auth(), clearWishlistController);

export default wishlistRouterWeb;