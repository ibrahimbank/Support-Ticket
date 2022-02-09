import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; //bring the reducer from the slice folder

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
