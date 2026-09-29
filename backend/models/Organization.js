import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    // ═══════════════════════════════════════════════
    // 1. CORE IDENTITY
    // ═══════════════════════════════════════════════
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    logoUrl: { type: String },

    // ═══════════════════════════════════════════════
    // 2. LEGAL & BILLING
    // ═══════════════════════════════════════════════
    companyRegistrationNumber: { type: String, unique: true, sparse: true },
    taxId: { type: String },
    billingEmail: { type: String },

    // ═══════════════════════════════════════════════
    // 3. LOCALIZATION
    // ═══════════════════════════════════════════════
    currency: { type: String, default: "INR" },
    timezone: { type: String, default: "Asia/Kolkata" },

    // ═══════════════════════════════════════════════
    // 4. ACCESS & HIERARCHY
    // ═══════════════════════════════════════════════
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ═══════════════════════════════════════════════
    // 5. SAAS MANAGEMENT
    // ═══════════════════════════════════════════════
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

    // ═══════════════════════════════════════════════
    // 6. BUSINESS OPERATIONS PROFILE
    // ═══════════════════════════════════════════════
    operationsProfile: {
      serviceModels: [{
        type: String,
        enum: [
          "dine_in",
          "takeaway",
          "cloud_kitchen",
          "catering",
          "delivery_own",
          "delivery_aggregator"
        ]
      }],
      cuisineTypes: [{ type: String }],
      avgDailyOrders: { type: Number },
      operatingSchedule: {
        type: String,
        enum: ["fixed_hours", "24x7", "seasonal"],
        default: "fixed_hours"
      }
    },

    // ═══════════════════════════════════════════════
    // 7. CUSTOM ROLE DEFINITIONS
    // Maps org-specific titles to core permission tiers
    // ═══════════════════════════════════════════════
    customRoles: [{
      name: { type: String },
      basedOn: {
        type: String,
        enum: ["manager", "supervisor", "staff", "trainee", "auditor", "accountant"]
      },
      description: { type: String }
    }],

    // ═══════════════════════════════════════════════
    // 8. WORKFORCE SUMMARY (cached counters)
    // ═══════════════════════════════════════════════
    workforce: {
      totalEmployees: { type: Number, default: 0 },
      activeEmployees: { type: Number, default: 0 },
      departments: [{
        name: { type: String },
        headcount: { type: Number, default: 0 }
      }]
    },

    // ═══════════════════════════════════════════════
    // 9. DELIVERY & PLATFORM INTEGRATIONS
    // ═══════════════════════════════════════════════
    integrations: {
      deliveryPlatforms: [{
        name: { type: String },
        isActive: { type: Boolean, default: false },
        merchantId: { type: String }
      }],
      posSystem: { type: String },
      accountingSoftware: { type: String }
    },

    // ═══════════════════════════════════════════════
    // 10. ORG-WIDE COMPLIANCE & LICENSING
    // ═══════════════════════════════════════════════
    compliance: {
      gstRegistered: { type: Boolean, default: false },
      shopAndEstablishmentLicense: { type: String },
      fireSafetyCertificate: { type: String },
      liquorLicense: { type: String },
      halaalCertification: { type: String },
      isoCertified: { type: Boolean, default: false }
    },

    // ═══════════════════════════════════════════════
    // 11. CONTACT & SUPPORT
    // ═══════════════════════════════════════════════
    support: {
      primaryPhone: { type: String },
      secondaryPhone: { type: String },
      website: { type: String },
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String }
      }
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;