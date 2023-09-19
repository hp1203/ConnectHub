import mongoose from "mongoose";

// Define a User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    // Add fields for OAuth2 authentication (if applicable)
    oauthProviders: [
      {
        provider: String, // e.g., 'google', 'facebook'
        providerId: String, // ID from the provider
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a User model
const User = mongoose.model("User", userSchema);

export default User;
