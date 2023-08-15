import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

// Adding Auth Reducer to Store
const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;