import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import serviceRoutes from "./src/routes/service.routes.js";

// BACKEND INITIALIZATION
const app = express();

// CORS POLICY TO PREVENT API ERRORS
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const clientURL = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.replace(/\/$/, "")
    : "";

  const allowOrigins = ["http://localhost:5173", clientURL].filter(Boolean);

  if (origin && allowOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", allowOrigins[0] || "*");
  }

  // ALLOW METHODS TYPE
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error in the MongoDB connection", err));

// USING THE ROUTES THATS CREATED ROUTES FOLDERS
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/services", serviceRoutes);

export default app;
