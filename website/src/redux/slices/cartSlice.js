import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCart, removeCartItem, updateCartItem, clearCart } from "../../Api/api";
import { showError, showSuccess } from "../../services/toastService";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
    try {
        const res = await getCart();
        return res.data.cart;
    } catch (error) {
        const msg = error?.response?.data?.message || "Failed to fetch cart";
        return thunkAPI.rejectWithValue(msg);
    }
});

export const addCart = createAsyncThunk(
    "cart/addToCart",
    async ({ id, quantity, size, color }, thunkAPI) => {
        try {
            await addCartItem(id, quantity, size, color);
            await thunkAPI.dispatch(fetchCart());
            showSuccess("Product added to cart");
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Failed to add to cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId, thunkAPI) => {
    try {
        await removeCartItem(itemId);
        await thunkAPI.dispatch(fetchCart());
        showSuccess("Item removed from cart");
    } catch (error) {
        const msg = error?.response?.data?.message || "Failed to remove item";
        showError(msg);
        return thunkAPI.rejectWithValue(msg);
    }
});

export const updateCartQty = createAsyncThunk(
    "cart/updateCartQty",
    async ({ itemId, quantity }, thunkAPI) => {
        try {
            await updateCartItem(itemId, quantity);
            await thunkAPI.dispatch(fetchCart());
            showSuccess("Cart updated");
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to update cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const clearCartItems = createAsyncThunk(
    "cart/clearCartItems",
    async(_,thunkAPI) =>{
        try {
            await clearCart();
            await thunkAPI.dispatch(fetchCart());
            showSuccess("Cart Cleared");
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to clear cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
)

// SLICE
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // add to cart
            .addCase(addCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update cart
            .addCase(updateCartQty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQty.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCartQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // clear all cart items
            .addCase(clearCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartItems.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(clearCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
