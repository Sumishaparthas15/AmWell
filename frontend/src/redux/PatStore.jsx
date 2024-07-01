import { configureStore } from '@reduxjs/toolkit';
import authReducer from './PatauthSlice'; // Correct import path if necessary

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
