import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://ashbhati26:ashishbhati@cluster0.ktnbq.mongodb.net/notes-app";

// Define the ConnectDB function
export const ConnectDB = async () => {
  try {
    // Ensure connection only occurs if not already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected.");
      return;
    }
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};
