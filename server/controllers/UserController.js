import { renameSync } from "fs";
import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

export const getUserInfo = async (request, response) => {

}

export const setUserProfile = async (request, response) => {
  connectToDb();
  try {
    const { title, bio } = request.body;
    const { userId } = response;
    const profile = await Profile.create({
      userId,
      profileTitle: title,
      bio
    });

    return response.status(201).json({
      profile: profile,
      success: true,
      message: "Profile created successfully!",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
}

export const updateProfile = async (request, response) => {
  connectToDb();

  try {
    const { userId } = response;
    const { profileId } = request.params;

    const updatedUser = await Profile.findOneAndUpdate(
      { _id: profileId, userId: userId },
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
    const { profileId } = request.params;

    if (!file) return response.status(400).json({ error: "Image is required" });

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, userId: userId },
      { profilePicture: fileName },
      { new: true, upsert: true }
    );

    return response.status(201).json({
      user: updatedProfile,
      success: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
