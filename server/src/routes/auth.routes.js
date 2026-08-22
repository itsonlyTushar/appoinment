import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { uploadProfilePicture } from "../middlewares/upload.middleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER WITH EMAIL
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
      return res
        .status(400)
        .json({ message: "Please Provide Required Fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contactNumber: contact,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// REGSITER WITH GOOGLE
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPassword(randomPassword);

      user = new User({
        name,
        email,
        password: hashedPassword,
        contactNumber: "Not Provided",
        profilePicture: picture || "",
      });
      await user.save();
    }

    // CREATE JWT SIGNATURE
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // SEND SUCESS STATUS
    res.status(200).json({
      message: "Google authentication successful!",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during Google auth" });
  }
});

// LOGIN WITH EMAIL
router.post("/login", async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Credentials not been found" });
    }

    const isMatched = await comparePassword(password, user.password);

    // IF NOT MATCHED THROW ERROR OF ID PASS ARE INVALIDS
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // IF USER SELECTED REMEBMER PASSWORD WILL LAST 30 DAYS WITHOUT LOGIN
    const expiresIn = rememberMe ? "30d" : "1d";

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn,
      },
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET CURRENT AUTHENTICATED USER PROFILE
router.get("/me", authenticate, async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        contactNumber: req.user.contactNumber,
        profilePicture: req.user.profilePicture || "",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE CURRENT USER PROFILE
router.patch(
  "/update-me",
  authenticate,
  uploadProfilePicture,
  async (req, res) => {
    try {
      // EXTRACT DETAILS TO UPDATE FROM USER BODY
      const { name, contactNumber, contact } = req.body;

      // MAKE SURE CLEITN DOES NOT SEND EMPTY VALUES
      if (name !== undefined && !name.trim()) {
        return res.status(400).json({ message: "Full name cannot be empty." });
      }

      const updates = {};
      if (name !== undefined) updates.name = name.trim();

      const newContact = contactNumber !== undefined ? contactNumber : contact;
      if (newContact !== undefined) {
        if (!newContact.trim()) {
          return res
            .status(400)
            .json({ message: "Contact number cannot be empty." });
        }
        updates.contactNumber = newContact.trim();
      }

      // UPLOAD NEW PFP TO CLOUDINARY USING SUPPORTING SERVICE AND RECIEVE NEW URL
      if (req.file) {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "doctor-appointment/profiles",
        );
        updates.profilePicture = uploadResult.secure_url;
      }

      // SEARCH USER WITH ID TO MATCH AND UPDATE THE NEW DETAILS
      const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      }).select("-password");

      // SEND SUCESS CODE AFTERWARDS
      return res.status(200).json({
        message: "Profile updated successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          contactNumber: user.contactNumber,
          profilePicture: user.profilePicture || "",
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to update profile." });
    }
  },
);

export default router;
