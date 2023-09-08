import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: String,
    icon: String
}, {
    timestamps: true
});

const Link = mongoose.model("Link", linkSchema);

export default Link;