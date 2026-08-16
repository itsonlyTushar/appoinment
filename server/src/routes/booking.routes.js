import express from "express";
import Booking from "../models/Booking.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE NEW APPOINTMENT BOOKING
router.post("/new", authenticate, async (req, res) => {
  try {
    const { date, department, comments, reports } = req.body;

    if (!date || !department) {
      return res.status(400).json({
        message: "Date and department are required",
      });
    }

    // CHECK SAME BOOKING EXISTS OR NOT
    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      date,
      department,
    });

    if (alreadyBooked) {
      return res.status(409).json({
        message: "Same booking already exists",
      });
    }

    // CREATE NEW BOOKING
    const booking = new Booking({
      user: req.user._id,
      date,
      department,
      comments,
      reports: Array.isArray(reports) ? reports : reports ? [reports] : [],
    });

    const save = await booking.save();

    return res.status(201).json({
      message: "Booking created for your selected date and time",
      booking: save,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER'S BOOKINGS
router.get("/my-bookings", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
