import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Optionally, you can also export the `AppDispatch` type
export type AppDispatch = typeof store.dispatch;
