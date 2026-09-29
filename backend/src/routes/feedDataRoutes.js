import express from "express";
import {
  createBranch,
  createOrganization,
} from "../../controllers/feedDataController.js";

const router = express.Router();

router.post("/createBranch", createBranch);
router.post("/createOrganization", createOrganization);

export default router;
