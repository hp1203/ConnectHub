import mongoose from "mongoose";

const paymentGatewaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    api_key: {
      type: String,
    },
    api_secret: {
      type: String, // 'razorpay' or 'stripe'
    },
    webhook_secret: {
      type: String, // ID from the payment gateway
    },
    is_active: {
      type: Boolean, // true, false
    },
  },
  {
    timestamps: true,
  }
);

const PaymentGateways = mongoose.model("PaymentGateways", paymentGatewaySchema);

export default PaymentGateways;