import mongoose, { Schema } from "mongoose";

const permissionSchema = new mongoose.Schema({
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
  access_level: {
    type: String, // e.g., 'read', 'write', 'admin'
    required: true,
  },
});

const Permissions = mongoose.model("Permissions", permissionSchema);

export default Permissions;
