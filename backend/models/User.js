import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide full name"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // 🛡️ Security: Don't return password in API calls
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "enterpriseadmin",
        "branchadmin",
        "manager",
        "supervisor",
        "staff",
        "trainee",
        "auditor",
        "accountant",
      ],
      default: "staff",
    },

    // 🏢 MULTI-TENANCY RELATIONSHIPS
    // Links to the Franchise/Company (e.g., "McDonald's India")
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: function () {
        return this.role !== "superadmin";
      },
    },
    // Links to the specific Store/Kitchen (e.g., "Branch - Mumbai Terminal 2")
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return ["staff", "branchadmin", "manager", "supervisor", "trainee"].includes(this.role);
      },
    },

    // 📞 CONTACT & PERSONAL INFO
    contactNo: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    dateOfBirth: { type: Date },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    profilePicUrl: { type: String },

    // 🏢 EMPLOYMENT DETAILS
    employeeId: { type: String, unique: true, sparse: true },
    functionalTitle: { type: String },
    department: {
      type: String,
      enum: [
        "kitchen",
        "front-of-house",
        "housekeeping",
        "admin",
        "compliance",
        "finance",
        "hr",
        "procurement",
        "maintenance",
      ],
    },
    dateOfJoining: { type: Date },
    employmentStatus: {
      type: String,
      enum: [
        "active",
        "on_leave",
        "probation",
        "notice_period",
        "terminated",
        "resigned",
      ],
      default: "active",
    },
    shift: {
      type: String,
      enum: ["morning", "afternoon", "night", "rotational", "general"],
    },

    // 👔 REPORTING HIERARCHY
    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hrManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🛡️ COMPLIANCE (core to KitchenOS / FoSTaC)
    fostacCertified: { type: Boolean },
    fostacCertificateNumber: { type: String },
    fostacExpiryDate: { type: Date },
    aadharLastFour: { type: String },

    // 💰 PAYROLL (optional)
    salary: { type: Number },

    // 🛡️ APPROVAL & ACCESS CONTROL
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending", // New signups must be approved by a Branch Admin
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// 🛡️ PASSWORD ENCRYPTION
userSchema.pre("save", async function () {
  // Only hash the password if it's new or being modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // ❌ REMOVE next() from here
  } catch (error) {
    // If using async, Mongoose catches thrown errors automatically
    throw new Error("Password encryption failed");
  }
});


userSchema.methods.getJWTToken = function () {
  if (!process.env.JWT_SECRET) {
    console.error("CRITICAL: JWT_SECRET is missing from .env");
  }
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
};

// 🛡️ PASSWORD COMPARISON METHOD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
