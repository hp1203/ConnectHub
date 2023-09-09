import Link from "../models/link.model.js";
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
