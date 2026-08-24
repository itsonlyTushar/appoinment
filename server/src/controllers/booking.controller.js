import Booking from "../models/Booking.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { VALID_TIME_SLOTS } from "../utils/timeSlots.js";

// CREATE NEW APPOINTMENT BOOKING
export const createBooking = async (req, res) => {
  try {
    const { date, department, doctor, comments } = req.body;
    let reports = req.body.reports;

    if (!date || !department || !doctor) {
      return res.status(400).json({
        message: "Date, department, and doctor are required",
      });
    }

    // VALIDATE APPOINTMENT TIME SLOT -- BETWEEN 10:00 AM AND 05:00 PM ONLY
    const timePart = date.includes("T")
      ? date.split("T")[1].slice(0, 5)
      : date.includes(" ")
        ? date.split(" ")[1]?.slice(0, 5)
        : "";

    // IF CLIENT SENDS INVALID DATE AND SLOT WILL PREVENT BY GIVING 400 ERROR
    if (timePart && !VALID_TIME_SLOTS.includes(timePart)) {
      return res.status(400).json({
        message: "Invalid appointment slot.",
      });
    }

    // CHECK SAME BOOKING EXISTS OR NOT
    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      date,
      department,
      doctor,
    });

    if (alreadyBooked) {
      return res.status(409).json({
        message: "Same booking already exists",
      });
    }

    // PROCESS SINGLE REPORT FILE UPLOAD TO CLOUDINARY
    const reportUrl = [];

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      if (uploadResult && uploadResult.secure_url) {
        reportUrl.push(uploadResult.secure_url);
      }
    } else if (reports) {
      const parsedReports = Array.isArray(reports) ? reports : [reports];
      reportUrl.push(...parsedReports.filter(Boolean));
    }

    // CREATE NEW BOOKING
    const booking = new Booking({
      user: req.user._id,
      date,
      department,
      doctor,
      comments,
      reports: reportUrl,
    });

    // FINALLY SAVE BOOKING WITH DETAILS + REPORT
    const save = await booking.save();

    // RETURN SUCCESSFUL MESSAGE
    return res.status(201).json({
      message: "Booking created for your selected date and time",
      booking: save,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET USER'S BOOKINGS (filtered by year via query param)
export const getUserBookings = async (req, res) => {
  try {
    // TAKE YEAR FROM THE CLIENT
    const { year } = req.query;

    // EXTRACT USER
    const query = { user: req.user._id };

    // CONVERT YEAR QUERY STRING INTO INTEGER
    if (year) {
      const y = parseInt(year, 10);
      if (!isNaN(y)) {
        query.date = { $regex: String(y) };
      }
    }

    // FIND BOOKINGS FROM MONGODB
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET BOOKING YEARS FOR USER -- USED IN CLIENT SELECTION DROP-DOWN
export const getBookingYears = async (req, res) => {
  try {
    // FIND YEARS TARGETING DATE FIELD FROM MONGODB
    const bookings = await Booking.find({ user: req.user._id }, "date");

    // CREATE YEARS SET AND SORT THEM IN DESCENDING ORDER
    const yearsSet = new Set();
    bookings.forEach((booking) => {
      if (booking.date) {
        const year = new Date(booking.date).getFullYear();
        if (!isNaN(year)) {
          yearsSet.add(year);
        }
      }
    });
    const years = Array.from(yearsSet).sort((a, b) => b - a);

    return res.status(200).json({ years });
  } catch (err) {
    console.error("Error fetching years:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
