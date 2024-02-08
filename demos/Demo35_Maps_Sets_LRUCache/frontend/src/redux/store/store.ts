import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from '../reducers/toDoReducer';

// Pass in the reducers to the store
export const store = configureStore({
    reducer: {
        'toDoList' : toDoReducer
    }   
});