import { renameSync } from "fs";
import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Link from "../models/link.model.js";
export const getUserInfo = async (request, response) => {
  connectToDb();
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    const profiles = await Profile.find({ user: id });
    return response.status(200).json({
      user: {...user._doc, profiles: profiles}
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
}

export const getProfileInfo = async (request, response) => {
  connectToDb();
  try {
    const { id } = request.params;
    const profile = await Profile.findOne({url: id}).populate("user");
    const links = await Link.find({ profile: profile._id });
    // const user = await User.findById(profile.user);
    return response.status(200).json({
      profile,
      links
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
}

export const setUserProfile = async (request, response) => {
  connectToDb();
  try {
    const { title, bio, url, category } = request.body;
    const { userId } = response;
    const profile = await Profile.create({
      user: userId,
      profileTitle: title,
      bio,
      url,
      category
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
      { _id: profileId, user: userId },
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
