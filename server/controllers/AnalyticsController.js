import mongoose from "mongoose";
import Analytics from "../models/analytic.model.js";
import Link from "../models/link.model.js";

export const addAnalyticsDetails = async (request, response) => {
  try {
    const { link_id, event, ip_address, user_agent, metadata, location, device, browser } = request.body;

    const analyticsData = await Analytics.create({
      link: link_id,
      eventType: event,
      ipAddress: ip_address,
      userAgent: user_agent,
      metadata,
      location,
      device,
      browser
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
        const linksData = await Analytics.find({ 
            'link': { 
                $in: profileLinkIds,
            } 
        });

        const groupedData = await Analytics.aggregate([
            {
                $match: {
                  link: { $in: profileLinkIds }
                }
              },
            {
                "$group": { _id: { link: "$link", eventType: "$eventType", userAgent: "$userAgent", createdAt: "$createdAt" }, count: {$sum:1} }
            }
        ]);

        const clickCounts = await Analytics.countDocuments({ link: profileLinkIds, eventType: 'click' });
        const viewCounts = await Analytics.countDocuments({ link: profileLinkIds, eventType: 'view' });

        return response.status(200).json({ 
            data: linksData,
            groupedData,
            clickCounts,
            viewCounts
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: error.message });
    }
}
