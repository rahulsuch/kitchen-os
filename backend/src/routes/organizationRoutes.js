import express from "express";
import { organizationList, branchList, branchListByOrganization } from "../../controllers/dataListController.js";

const router = express.Router();

//dataList routes
router.get("/getOrganizationList", organizationList)
router.get("/getBranchList", branchList)
router.get("/getBranchListByOrganization/:organizationId", branchListByOrganization)

export default router;