import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Matches your "User" model name
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  title: { type: String, required: true }, // e.g., "Fridge Temp Check"
  category: { 
    type: String, 
    enum: ['Food Safety', 'Hygiene', 'Compliance', 'Maintenance'],
    default: 'Hygiene'
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'COMPLETED', 'FAILED'], 
    default: 'PENDING' 
  },
  score: { type: Number, min: 0, max: 100 },
  notes: String
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);
export default Log;