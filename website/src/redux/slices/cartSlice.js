import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCart, removeCartItem, updateCartItem } from "../../Api/api";
import { showError, showSuccess } from "../../services/toastService";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const res = await getCart();
            console.log('fetchCart', res.data);
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "failed to fetch cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const addCart = createAsyncThunk(
    'cart/addToCart',
    async (product, thunkAPI) => {
        try {
            const res = await addCartItem(product);
            showSuccess("Item added to cart!");
            return res.data.cart;
        }
        catch (error) {
            const msg = error?.response?.data?.message || "failed to fetch cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (itemId, thunkAPI) => {
        try {
            const res = await removeCartItem(itemId);
            showSuccess("Item removed successfully");
            return itemId;

        } catch (error) {
            const msg = error?.response?.data?.message || "failed to fetch cart";
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const updateCartQty = createAsyncThunk(
    'cart/updateCartQty',
    async ({ itemId, quantity }, thunkAPI) => {
        try {
            const res = await updateCartItem(itemId, quantity);
            showSuccess('Cart updated!');
            return res.data.cart; // updated cart
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to update quantity';
            showError(msg);
            return thunkAPI.rejectWithValue(msg);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add cart Item
            .addCase(addCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(addCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove cart Item
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = state.items.filter((item) => item._id !== action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // UPDATE QUANTITY
            .addCase(updateCartQty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQty.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(updateCartQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;