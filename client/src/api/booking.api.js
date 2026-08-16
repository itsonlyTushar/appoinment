import { api } from "../lib/axios";

/* SINGLE SOURCE OF THE TRUTH FOR CALLING BACK-END BOOKING API */

// WRAPPING BOOKING API - POST
export const bookingUser = async (payload) => {
  const { data } = await api.post("/api/booking/new", payload);

  return data;
};

// WRAPPING BOOKING API - GET
export const getUserBooking = async () => {
  const { data } = await api.get("");

  return data;
};
