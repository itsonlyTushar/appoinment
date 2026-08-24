import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingYears,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { uploadReports } from "../middlewares/upload.middleware.js";

const router = express.Router();

// CREATE NEW APPOINTMENT BOOKING
router.post("/new", authenticate, uploadReports, createBooking);

// GET USER'S BOOKINGS (filtered by year via query param)
router.get("/my-bookings", authenticate, getUserBookings);

// GET BOOKING YEARS FOR USER -- USED IN CLIENT SELECTION DROP-DOWN
router.get("/years", authenticate, getBookingYears);

export default router;
