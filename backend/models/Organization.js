import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    // 1. Core Identity
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true }, // e.g., "awesome-burgers"
    logoUrl: { type: String },

    // 2. Legal & Billing
    companyRegistrationNumber: { type: String, unique: true },
    taxId: { type: String }, // e.g., GSTIN in India, VAT in Europe
    billingEmail: { type: String },
    
    // 3. Localization (Crucial for Reports & POS)
    currency: { type: String, default: "INR" },
    timezone: { type: String, default: "Asia/Kolkata" },

    // 4. Access & Hierarchy
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 5. KitchenOS SaaS Management
    subscriptionPlan: {
      type: String,
      enum: ["basic", "premium", "enterprise"],
      default: "basic",
    },
    status: {
      type: String,
      enum: ["trial", "active", "suspended", "cancelled"],
      default: "trial",
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;