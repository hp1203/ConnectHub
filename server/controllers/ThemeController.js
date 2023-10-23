import Theme from "../models/theme.model.js";
import { connectToDb } from "../utils/database.js";

export const getProfileTheme = async (request, response) => {
    connectToDb();
    try {
      const { profileId } = request.params;
      
      let theme = await Theme.findOne({ profile: profileId });
      if (!theme) {
        theme = await Theme.create({ profile: profileId });
      }
  
      return response.status(200).json({
        theme,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
};


export const updateTheme = async (request, response) => {
  connectToDb();
  try {
    const { profileId } = request.params;

    const updatedTheme = await Theme.findOneAndUpdate(
      { profile: profileId },
      request.body,
      {
        new: true,
        upsert: true,
      }
    );
    return response.status(200).json({
      link: updatedTheme,
      success: true,
      message: "Theme updated successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
