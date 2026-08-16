import express from "express";
import Services from "../models/Services.js";

const router = express.Router();

// GET ALL SERVICES
router.get("/get-all", async (req, res) => {
  try {
    const services = await Services.find({ status: "active" }).sort({
      name: 1,
    });
    return res
      .status(200)
      .json({ success: true, count: services.length, services });
  } catch (err) {
    console.error("Error fetching services:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
