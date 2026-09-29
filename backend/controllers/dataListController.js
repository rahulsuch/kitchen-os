import Organization from "../models/Organization.js";
import Branch from "../models/Branch.js";

/** 
   * @description Get the List of live Organizations from database
   * @Param {none}
   * @Access Authenticated Users
*/
export const organizationList = async (req, res, next) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get the List of live Branches from database
 * @Param {none}
 * @Access Authenticated Users
 */
export const branchList = async (req, res, next) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get the List of live Branches for a specific Organization from database
 * @Param {organizationId} - The ID of the organization to filter branches by
 */
export const branchListByOrganization = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const branches = await Branch.find({ organization: organizationId });
    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
};
