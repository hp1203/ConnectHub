import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    duration_days: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);

export default Subscription;