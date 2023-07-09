import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/authService";

let user = localStorage.getItem('user'); // Data-persistence on page refresh

// Create Thunk Functions to deal with HTTP calls and storage management
export const login = createAsyncThunk('auth/login', 
    async(user, thunkAPI) => {
        try {
            return await authService.login(user);
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', 
    async(_, thunkAPI) => {
        try {
            return await authService.logout();
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

// Setting an initial state
const initialState = {
    user: user ? JSON.parse(user) : null, // Check to see if user exists, if so, keep state
    isError: false,
    isLoading: false,
    isSuccess: false,
    token: null
}

// Creating a piece of state to be modified by reducers, thunk functions and their three cases: (action).[pending/fufilled/success]
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        reset : (state) => {
            state.isError = false;
            state.isLoading = false;
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.isError = action.error;
            state.isLoading = false;
            state.isSuccess = false;
            state.token = null;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.token = null;
            state.user = null;
        });
    }
});

export const { reset } = authSlice.actions; // Export actions
export default authSlice.reducer; // Export reducer of the Authentication Slice