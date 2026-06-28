import express from "express";
import {
  signup,
  logout,
  login,
  getme,
  forgotPassword,
  resetPassword
} from "../../controllers/authController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword); 

//protected routes
router.get("/me", protect, getme);

// Admin Only Routes
// router.get("/admin/users", protect, authorizeRoles("superadmin"), getAllUsers);

export default router;
