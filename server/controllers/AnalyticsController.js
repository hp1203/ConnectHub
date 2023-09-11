import mongoose from "mongoose";
import Analytics from "../models/analytic.model.js";
import Link from "../models/link.model.js";

export const addAnalyticsDetails = async (request, response) => {
  try {
    const { link_id, event, ip_address, user_agent, metadata } = request.body;

    const analyticsData = await Analytics.create({
      link: link_id,
      eventType: event,
      ipAddress: ip_address,
      userAgent: user_agent,
      metadata,
    });

    return response.status(200).json({
      success: true,
      data: analyticsData,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const getAnalyticsData = async (request, response) => {
    const { profileId } = request.params;

    try {
        const profileLinkIds = (await Link.find({ profile: profileId })).map((link) => link._id);
        console.log("Profile Links", profileLinkIds);
        // const analyticsData = await Analytics.find({ 
        //     'link': { 
        //         $in: profileLinkIds,
        //     } 
        // });

        const analyticsData = await Analytics.aggregate([
            {
                "$group": { _id: { link: "$link", eventType: "$eventType", userAgent: "$userAgent", createdAt: "$createdAt" }, count: {$sum:1} }
            }
        ])
        return response.status(200).json({ 
            links: analyticsData
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: error.message });
    }
}
