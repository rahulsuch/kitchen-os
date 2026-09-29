import express from "express";
import { updateMyProfile, changePassword } from "../../controllers/userController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.put("/me", protect, updateMyProfile);
router.put("/change-password", protect, changePassword);

export default router;
