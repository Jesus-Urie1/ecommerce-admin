import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    console.log("Connecting to MongoDB...");
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}
