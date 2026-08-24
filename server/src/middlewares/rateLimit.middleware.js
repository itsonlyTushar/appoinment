import rateLimit from "express-rate-limit";

// STRICT LIMITER FOR AUTHENTICATION ROUTES (LOGIN, REGISTER, GOOGLE)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 MINUTES
  max: 15, // LIMIT EACH IP TO 15 REQUESTS PER WINDOW
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again after sometime.",
  },
});

// GENERAL LIMITER FOR ALL API ROUTES
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 MINUTES
  max: 200, // LIMIT EACH IP TO 200 REQUESTS PER WINDOW
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after sometime.",
  },
});
