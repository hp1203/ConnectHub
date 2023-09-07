import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";

export const updateProfile = async (request, response) => {
  connectToDb();

  try {
    const { userId, email } = response;

    if (userId !== request.params.id)
      return response.status(401).send("You are not authenticated");

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, email: email },
      request.body,
      { upsert: true }
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
