import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCart, removeCartItem, updateCartItem } from "../../Api/api";
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

// SLICE
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = null;
        }
    },
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
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.loading = false;
                // if (state.cart?.items) {
                //     state.cart.items = state.cart.items.filter(item => item._id !== action.payload);
                // }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

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
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
