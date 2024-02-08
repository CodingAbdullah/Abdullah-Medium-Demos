import { createSlice } from '@reduxjs/toolkit';
import LRU from '../../dataTypes/LRUCache';

// Set a new LRU cache and retrieve the empty cache
// Maximum is 5
// Persist data storage
let persistStorage = localStorage.getItem('toDoList') === null ?
                     localStorage.setItem('toDoList', JSON.stringify(new LRU(5).getLRUCache())) : 
                     localStorage.getItem('toDoList');

// Create slice of data
// State will be a persistent store consisting of the LRU cache data
const ToDoListReducer = createSlice({
    name: 'toDoList',
    initialState: persistStorage,
    reducers: {
        addItemReducer: (state, action) => {
        },
        removeItemReducer: (state, action) => {
        }
    }
});

// Export Action functions
export const actions = ToDoListReducer.actions;

// Export the Reducer itself
export default ToDoListReducer.reducer;