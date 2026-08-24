import mongoose from "mongoose";

// BOOKING SCHEMA TO MAINTAIN CONSISTEN TYPES ACROSS ALL INTERACTIONS WITH DB
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
