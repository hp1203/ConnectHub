import mongoose from "mongoose";
let isConnected = false;

export const connectToDb = async () => {
  console.log(process.env.MONGODB_URI);
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongodDB is already connected!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "connect_hub",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
