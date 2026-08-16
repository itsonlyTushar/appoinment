import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import { bookingReducer } from "./reducers/bookingReducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
