import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import serviceRoutes from "./src/routes/service.routes.js";
import { setupSwagger } from "./src/config/swagger.js";
import {
  generalLimiter,
  authLimiter,
} from "./src/middlewares/rateLimit.middleware.js";

// BACKEND INITIALIZATION
const app = express();

// CORS POLICY TO PREVENT API ERRORS
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.CLIENT_URL,
  ]
    .filter(Boolean)
    .map((value) => value.replace(/\/$/, ""));

  if (origin && allowOrigins.includes(origin.replace(/\/$/, ""))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (origin) {
    return res.status(403).json({ message: "Origin is not allowed." });
  }

  // ALLOW METHODS TYPE
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

// DATABASE CONNECTION 
connectDB();

// REGISTER RATE LIMITING MIDDLEWARE
app.use("/api", generalLimiter);

// USING THE ROUTES THATS CREATED IN ROUTES FOLDERS
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/services", serviceRoutes);

// SETUP SWAGGER API DOCUMENTATION
setupSwagger(app);

export default app;
