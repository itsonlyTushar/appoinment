import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    department: { type: String, required: true },
    doctor: { type: String, required: true },
    comments: { type: String, required: false },
    reports: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
