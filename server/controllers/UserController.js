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
