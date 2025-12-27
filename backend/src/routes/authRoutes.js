import express from "express";
import {
  signup,
  logout,
  login,
  getme,
} from "../../controllers/authController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//protected routes
router.get("/me", protect, getme);

// Admin Only Routes
// router.get("/admin/users", protect, authorizeRoles("superadmin"), getAllUsers);

export default router;
