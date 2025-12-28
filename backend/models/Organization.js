import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      unique: true,
      trim: true,
    },
    companyRegistrationNumber: {
      type: String,
      unique: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The Enterprise Admin / Owner X
    },
    subscriptionPlan: {
      type: String,
      enum: ["basic", "premium", "enterprise"],
      default: "basic",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;