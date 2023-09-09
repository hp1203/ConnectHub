import Link from "../models/link.model.js";
import Profile from "../models/profile.model.js";
import { connectToDb } from "../utils/database.js";

export const getProfileLinks = async (request, response) => {
  connectToDb();
  try {
    const { profileId } = request.params;

    const links = await Link.find({ profile: profileId });

    if (links.length <= 0)
      return response.status(404).json({ error: "Links not found " });

    return response.status(200).json({
      links,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const addNewLink = async (request, response) => {
  connectToDb();
  try {
    const { profileId } = request.params;
    const { title, description, icon, url, tags } = request.body;

    const createdLink = await Link.create({
      profile: profileId,
      title,
      description,
      icon,
      url,
      tags,
    });
    return response.status(200).json({
      success: true,
      link: createdLink,
      message: "Link created successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const deleteLink = async (request, response) => {
    connectToDb();
    try {
        const { linkId } = request.params;
        const { userId } = response;

        const link = await Link.findById(linkId).populate({path:"profile"});
        console.log("link", link);

        if(link.profile.user.toString() !== userId) return response.status(401).send("You are not autherized");

        await Link.findByIdAndRemove(linkId);
        return response.status(200).json({
            success: true,
            message: "Link deleted successfully",
          });
    } catch (error) {
        console.log(error);
    return response.status(500).json({ error: error.message });
    }
};
