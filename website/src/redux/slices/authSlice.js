import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, logoutUser } from "../../Api/api";

export const loadUserFromCookies = createAsyncThunk(
    'auth/loadUserFromCookies',
    async (_, thunkAPI) => {
        try {
            const res = await getUser();
            return res.data.user;
        } catch (error) {
            const status = error?.status;
            const message = error?.message;

            //Only remove localStorage and logout if token expired or unauthorized
            if (status === 401 || message === "Token expired" || message === "unauthorized access") {
                localStorage.removeItem("EazyCartUser");
                thunkAPI.dispatch(logout());
            }

            return thunkAPI.rejectWithValue(null);
        }
    }
)

export const logoutUserThunk = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            await logoutUser();
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
)

const initialState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromCookies.pending, (state) => {
                state.loading = false;
            })
            .addCase(loadUserFromCookies.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(loadUserFromCookies.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.error = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.error = true;
            })

    }
});

export const { loginSuccess, logout, setAuthLoadingFalse } = authSlice.actions;
export default authSlice.reducer;