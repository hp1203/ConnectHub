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
    price: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    selling_price: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    duration: {
      type: String, // monthly, yearly, forever etc.
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

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);

export default Subscription;
