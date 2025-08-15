import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    monthly_price: {
      type: Number,
      required: true,
    },
    monthly_selling_price: {
      type: Number,
      required: true,
    },
    yearly_price: {
      type: Number,
      required: true,
    },
    yearly_selling_price: {
      type: Number,
      required: true,
    },
    features: [
      {
        display_name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        metadata: {
          type: Object,
        },
        description: {
          type: String,
        },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
