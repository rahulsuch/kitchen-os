import Branch from "../models/Branch.js";
import Organization from "../models/Organization.js";

/**
 * @description Create a new Branch
 * @param {Object} req - Express request object containing branch data in req.body
 * @param {Object} res - Express response object to send the created branch data
 */

export const createBranch = async (req, res) => {
  try {
    // Support both raw payload and { data: ... } wrapper
    const payload = req.body.data || req.body;
    
    // Destructure the EXACT keys your frontend is sending
    const { 
      organizationId, 
      branchName, 
      branchType, 
      location, 
      receptionContact 
    } = payload;

    const branch = await Branch.create({
      name: branchName,            // Map frontend 'branchName' to model 'name'
      organization: organizationId, // Map frontend 'organizationId' to model 'organization'
      branchType,
      location,
      receptionContact,
      // Skipping manager/branchHead for now since it's a text string ("Rahul Singh") 
      // but Mongoose expects a valid User ObjectId.
    });
    res.status(201).json(branch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res
      .status(500)
      .json({ message: "Failed to create branch", error: error.message });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const payload = req.body.data || req.body;
    const { name, slug, logoUrl, companyRegistrationNumber, taxId, billingEmail, currency, timezone } = payload;
    const organization = await Organization.create({
      name,
      slug,
      logoUrl,
      companyRegistrationNumber,
      taxId,
      billingEmail,
      currency,
      timezone
    });
    res.status(201).json(organization);
  } catch (error) {
    console.error("Error creating organization:", error);
    res
      .status(500)
      .json({ message: "Failed to create organization", error: error.message });
  }
};
