import { configureStore } from "@reduxjs/toolkit";
import stateSlice from './Slices/stateSlice'
import authSlice from './Slices/authSlice'
export const store = configureStore({
    reducer: {
        state: stateSlice,
        auth:authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;