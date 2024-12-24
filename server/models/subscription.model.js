import mongoose, { Schema, SchemaType } from "mongoose";

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
    duration_days: {
      type: Number,
      required: true,
    },
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
