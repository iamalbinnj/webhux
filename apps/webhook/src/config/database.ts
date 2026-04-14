import mongoose from "mongoose";
import config from "./config";

export const initializeDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.db.uri);

    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};