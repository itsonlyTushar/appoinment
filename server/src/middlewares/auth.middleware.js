import jwt from "jsonwebtoken";
import User from "../models/User.js";

// MIDDLEWARE TO VERIFY JWT
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required." });
    }

    // EXTRACT TOKEN FROM AUTH HEADERS 
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // CHECK IF USERS EXISTS OR NOT
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    req.user = user;
    req.auth = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired." });
    }
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};
