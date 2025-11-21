import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;
let connectionAttempted = false;

export async function connectToMongoDB() {
  // Skip if no MongoDB URI is configured
  if (!MONGODB_URI) {
    if (!connectionAttempted) {
      console.log("⚠ MongoDB URI not configured. Using fallback data.");
      console.log("  Set MONGODB_URI environment variable to enable database.");
      connectionAttempted = true;
    }
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30
    });
    isConnected = true;
    console.log("✓ Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("✗ MongoDB connection error:", error instanceof Error ? error.message : error);
    console.log("  Using fallback data. Set MONGODB_URI to enable database.");
    return false;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
});

export function isMongoConnected() {
  return isConnected;
}

export default mongoose;
