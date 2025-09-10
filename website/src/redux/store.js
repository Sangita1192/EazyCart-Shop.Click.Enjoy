import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        category: categoryReducer
    },
})