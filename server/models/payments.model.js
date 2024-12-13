import mongoose, { Schema } from "mongoose";

const paymentsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
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
    status: {
      type: String, // 'pending', 'success', 'failed'
      enum: ["success", "failed", "pending"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model("Payments", paymentsSchema);

export default Payments;
