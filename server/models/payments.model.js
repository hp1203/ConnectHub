import mongoose, { Schema } from "mongoose";

const paymentsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_subscription: {
      type: Schema.Types.ObjectId,
      ref: "UserSubscriptions",
      required: true,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    gateway: {
      type: String, // e.g. 'razorpay', 'stripe', 'paypal'
    },
    transactionId: {
      type: String, // Gateway-specific transaction ID
    },
    metadata: {
      type: Object, // Additional metadata related to the payment
    },
    status: {
      type: String, // 'pending', 'succeeded', 'failed'
      enum: ["succeeded", "failed", "pending"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model("Payments", paymentsSchema);

export default Payments;
