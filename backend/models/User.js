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
      enum: ["superadmin", "enterpriseadmin", "branchadmin", "staff"],
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
        return this.role === "staff" || this.role === "branchadmin";
      },
    },

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
