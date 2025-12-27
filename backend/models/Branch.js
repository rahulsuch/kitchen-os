import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch name is required"],
      trim: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization", // Link back to the Brand
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    fssaiLicenseNumber: {
      type: String,
      required: false,
      default: 'Pending Application'
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The Branch Manager Y
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;