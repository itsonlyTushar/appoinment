import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import { bookingReducer } from "./reducers/bookingReducers";
import { servicesReducer } from "./reducers/serviceReducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    services: servicesReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
