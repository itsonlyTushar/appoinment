import express from "express";
import {
  register,
  googleAuth,
  login,
  getMe,
  updateMe,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { uploadProfilePicture } from "../middlewares/upload.middleware.js";

const router = express.Router();

// REGISTER WITH EMAIL
router.post("/register", register);

// REGISTER / LOGIN WITH GOOGLE
router.post("/google", googleAuth);

// LOGIN WITH EMAIL
router.post("/login", login);

// GET CURRENT AUTHENTICATED USER PROFILE
router.get("/me", authenticate, getMe);

// UPDATE CURRENT USER PROFILE
router.patch("/update-me", authenticate, uploadProfilePicture, updateMe);

export default router;
