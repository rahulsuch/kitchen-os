import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      unique: true, // 🛡️ Prevents duplicate accounts
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // 🛡️ Security: Don't return password in API calls by default
    },
  },
  { timestamps: true }
); // Automatically adds 'createdAt' and 'updatedAt'

// 🛡️ SECURITY OPTIMIZATION: Encrypt password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.pre("save", async function () {
  // Only hash the password if it's new or being modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    // If hashing fails, throwing an error here stops the save process
    throw new Error("Password encryption failed");
  }
});

const User = mongoose.model("User", userSchema);
export default User;
