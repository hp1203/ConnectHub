import mongoose from "mongoose";

const featuresSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    metadata: {
      type: Object,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Features = mongoose.model("Features", featuresSchema);

export default Features;
