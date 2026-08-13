import express from "express";
import mongoose from "mongoose";
import authRoutes from './src/routes/auth.routes.js';

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error in the MongoDB connection", err));


// USING THE ROUTES THAT CREATED 
app.use('/api/auth', authRoutes)

export default app;
