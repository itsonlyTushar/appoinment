import express from "express";
import { getAllServices } from "../controllers/service.controller.js";

const router = express.Router();

// GET ALL SERVICES (WITH SERVER-SIDE PAGINATION)
router.get("/get-all", getAllServices);

export default router;
