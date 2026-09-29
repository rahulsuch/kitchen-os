import express from "express";
import { organizationList, branchList, branchListByOrganization } from "../../controllers/dataListController.js";
import {
  getOrganizationProfile,
  updateOrganizationProfile,
  transferOwnership,
} from "../../controllers/organizationController.js";
import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public / Internal List Routes
router.get("/getOrganizationList", organizationList);
router.get("/getBranchList", branchList);
router.get("/getBranchListByOrganization/:organizationId", branchListByOrganization);

// Protected Organization Profile Routes
router.get("/profile", protect, getOrganizationProfile);
router.put("/profile", protect, authorizeRoles("enterpriseadmin", "superadmin"), updateOrganizationProfile);
router.post("/transfer-ownership", protect, authorizeRoles("enterpriseadmin"), transferOwnership);

export default router;