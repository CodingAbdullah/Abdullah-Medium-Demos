import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../service/authService';

let token = localStorage.getItem('token'); // Retrieve token from localStorage, use this to persist data in global store

// Creating login thunk function
export const login = createAsyncThunk('auth/login', 
    async (payload, thunkAPI) => {
        try {
            return await authService.login(payload);
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Creating logout thunk function
export const logout = createAsyncThunk('auth/logout', 
    async (_, thunkAPI) => {
        try {
            return await authService.logout();
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Set the initial state to be used by Redux
const initialReduxState = {
    token: token ? token : null,
    isSuccess: false,
    isLoading: false,
    error: null
}

// Create authentication slice to be used as a reducer
const authSlice = createSlice({
    name: 'auth',
    initialState: initialReduxState,
    reducers : {
        reset: (state) => {
            state.error = null;
            state.token = null;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error = null;
            state.token = null;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.error = null;
            state.token = action.payload.token;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.error;
            state.token = null;
            state.isSuccess = false;
            state.isLoading = false;
        })
        .addCase(logout.fulfilled, (state) => {
            state.error = null;
            state.token = null;
            state.isLoading = false;
            state.isSuccess = false;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;