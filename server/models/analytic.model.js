import mongoose, { Schema } from "mongoose";

const analyticsSchema = new mongoose.Schema({
    link: {
        type: Schema.Types.ObjectId, // Reference to the link associated with the event
        ref: 'Link',
        required: true
    },
    eventType: {
        type: String, // Type of event (e.g., "click", "view", "conversion")
        required: true
    },
    ipAddress: String, // IP address of the user
    userAgent: String, // User agent string of the device/browser
    metadata: String // Additional event-specific data can be stored here
}, {
    timestamps: true
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;