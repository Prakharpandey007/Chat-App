const mongoose=require("mongoose");
const dotenv=require("dotenv");
// Load environment variables from .env file
dotenv.config();

export const connect = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};
