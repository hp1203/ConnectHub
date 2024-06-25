import mongoose, { Schema } from "mongoose";

const userSubscriptionsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
        required: true,
    },
    is_free_trial: {
        type: Boolean, // Indicates if this is a free trial subscription
        default: false
    },
    free_trial_duration_days: {
        type: Number // Duration of the free trial in days
    }
},{
    timestamps: true
});

const UserSubscriptions = mongoose.model("UserSubscriptions", userSubscriptionsSchema);

export default UserSubscriptions;