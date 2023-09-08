import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileTitle: String,
    profilePicture: String, // Store the file path or URL to the profile picture
    bio: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    socialLinks: {
      website: String,
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
    interests: [String],
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        graduationYear: Number,
      },
    ],
    workExperience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        responsibilities: [String],
      },
    ],
    skills: [String],
    customField1: mongoose.Schema.Types.Mixed, // Use appropriate type for custom fields
    customField2: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
