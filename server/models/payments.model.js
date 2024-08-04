import mongoose from "mongoose";

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
    payment_gateway: {
      type: String, // 'razorpay' or 'stripe'
    },
    gateway_payment_id: {
      type: String, // ID from the payment gateway
    },
    status: {
      type: String, // 'pending', 'completed', 'failed'
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model("Payments", paymentsSchema);

export default Payments;