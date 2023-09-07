import { renameSync } from "fs";
import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";

export const updateProfile = async (request, response) => {
  connectToDb();

  try {
    const { userId, email } = response;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, email: email },
      request.body,
      { new: true, upsert: true }
    );
    return response.status(201).json({
      user: updatedUser,
      success: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const updateProfileImage = async (request, response) => {
  connectToDb();
  try {
    const { file } = request;
    const { userId, email } = response;

    if (!file) return response.status(400).json({ error: "Image is required" });

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, email: email },
      { profilePicture: fileName },
      { new: true, upsert: true }
    );
    return response.status(201).json({
      user: updatedUser,
      success: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
