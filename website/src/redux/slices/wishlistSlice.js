import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWishlists } from "../../Api/api";


// fetch wishlist
export const fetchWishlist = createAsyncThunk(
    'products/fetchWishlist',
    async (_, thunkAPI) => {
        try {
            const res = await getWishlists();
            return res.data.wishlists;
        } catch (error) {
            const msg = error?.response?.data?.message || "failed to fetch wishlist";
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlists: [],
        loading: false,
        error: null,
    },
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.wishlists = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
    });

export default wishlistSlice.reducer;