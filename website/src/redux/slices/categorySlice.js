import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActiveCategories } from "../../../../admin/src/api/categoryApi";

// fetch all active categories
export const fetchActiveCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const res = await getActiveCategories();
            console.log('fetch categories', res.data);
            return res.data.categories;
        } catch (error) {
            const msg = error?.response?.data?.message || "failed to fetch categories";
            return thunkAPI.rejectWithValue(msg);
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
            // fetch Categories
            .addCase(fetchActiveCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categories = action.payload;
            })
            .addCase(fetchActiveCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
    });

export default categorySlice.reducer;