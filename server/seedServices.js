import "./env.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables.");
    }

    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(mongoUrl, { dbName: "test" });
    console.log(`Connected to database: ${conn.connection.name}`);

    const servicesFilePath = path.join(__dirname, "services.json");
    const servicesData = JSON.parse(fs.readFileSync(servicesFilePath, "utf8"));
    console.log(`Read ${servicesData.length} services from services.json`);

    const collection = conn.connection.collection("services");

    console.log("Clearing existing services collection...");
    await collection.deleteMany({});

    console.log("Inserting services...");
    const result = await collection.insertMany(servicesData);
    console.log(`Successfully inserted ${result.insertedCount} services into 'services' collection!`);

    const totalCount = await collection.countDocuments();
    console.log(`Total documents in 'services' collection: ${totalCount}`);

    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
}

seed();
