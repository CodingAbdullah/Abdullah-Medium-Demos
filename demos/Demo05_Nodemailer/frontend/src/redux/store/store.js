import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

// Set and forget the global store, a combination of all the global pieces of state in the form of reducers
const store = configureStore({
    reducer : {
        auth: authReducer
    }
});

export default store;