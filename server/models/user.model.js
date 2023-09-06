import mongoose from "mongoose";

// Define a User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // Store the file path or URL to the profile picture
  },
  bio: {
    type: String,
  },
  // Add fields for OAuth2 authentication (if applicable)
  oauthProviders: [
    {
      provider: String, // e.g., 'google', 'facebook'
      providerId: String, // ID from the provider
    },
  ],
  // Timestamps to track when the user document was created and updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a User model
const User = mongoose.model("User", userSchema);

export default User;
