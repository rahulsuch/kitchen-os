import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ role: 'superadmin' });
    if (adminExists) {
      console.log("Superadmin already exists!");
      process.exit();
    }

    await User.create({
      fullname: "System Maintainer",
      username: "superadmin",
      email: "admin@complianceos.com",
      password: "YourVerySecurePassword123", // Will be hashed by User.js pre-save hook
      role: "superadmin",
      status: "active"
      // organization and branch are left undefined
    });

    console.log("🚀 Superadmin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();