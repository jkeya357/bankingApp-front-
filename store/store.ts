import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth/authSlice"
import bankApi from "./api/bankApi";

export const store = configureStore({
  reducer:{
    [bankApi.reducerPath]: bankApi.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bankApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>