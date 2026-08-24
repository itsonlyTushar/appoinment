import mongoose from "mongoose";

// DATABASE CONNECTION HANDLER
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error in MongoDB connection:", err.message);
    process.exit(1);
  }
};

export default connectDB;
