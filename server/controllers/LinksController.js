import Link from "../models/link.model.js";
import Profile from "../models/profile.model.js";
import { connectToDb } from "../utils/database.js";

export const getLinkDetails = async (request, response) => {
    connectToDb();
    try {
      const { linkId } = request.params;
  
      const link = await Link.findById(linkId).populate({ path: "profile" });
  
      if (!link)
        return response.status(404).json({ error: "Link not found" });
  
      return response.status(200).json({
        link,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  };
export const getProfileLinks = async (request, response) => {
  connectToDb();
  try {
    const { profileId } = request.params;

    const links = await Link.find({ profile: profileId });

    if (links.length <= 0)
      return response.status(404).json({ error: "Links not found" });

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

export const editLink = async (request, response) => {
  connectToDb();
  try {
    const { linkId } = request.params;
    const { userId } = response;

    const link = await Link.findById(linkId).populate({ path: "profile" });

    if (link.profile.user.toString() !== userId)
      return response.status(401).send("You are not autherized");

    const updatedLink = await Link.findByIdAndUpdate(linkId, request.body, {
      new: true,
      upsert: true,
    });

    return response.status(200).json({
      link: updatedLink,
      success: true,
      message: "Link updated successfully",
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

    const link = await Link.findById(linkId).populate({ path: "profile" });

    if (link.profile.user.toString() !== userId)
      return response.status(401).send("You are not autherized");

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
