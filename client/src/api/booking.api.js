import { api } from "../lib/axios";

/* SINGLE SOURCE OF THE TRUTH FOR CALLING BACK-END BOOKING API */

// WRAPPING BOOKING API - POST
export const bookingUser = async (payload) => {
  const { data } = await api.post("/api/booking/new", payload);

  return data;
};

// WRAPPING BOOKING API - GET
export const getUserBookings = async (year) => {
  const params = year ? { year } : {};
  const { data } = await api.get("/api/booking/my-bookings", { params });

  return data;
};

// WRAPPING BOOKING YEARS API - GET
export const getBookingYears = async () => {
  const { data } = await api.get("/api/booking/years");

  return data;
};
