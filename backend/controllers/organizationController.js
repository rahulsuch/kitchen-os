import Organization from "../models/Organization.js";
import User from "../models/User.js";

/**
 * @desc    Get current user's organization profile
 * @route   GET /api/v1/organizations/profile
 * @access  Protected
 */
export const getOrganizationProfile = async (req, res, next) => {
  try {
    if (!req.user.organization) {
      const error = new Error("User does not belong to any organization");
      error.status = 404;
      return next(error);
    }

    const organization = await Organization.findById(req.user.organization)
      .populate("admin", "fullname username email role contactNo functionalTitle");

    if (!organization) {
      const error = new Error("Organization not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      organization,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update organization profile (operations, integrations, compliance, support)
 * @route   PUT /api/v1/organizations/profile
 * @access  Protected (Enterprise Admin / Superadmin)
 */
export const updateOrganizationProfile = async (req, res, next) => {
  try {
    if (!req.user.organization) {
      const error = new Error("User does not belong to any organization");
      error.status = 404;
      return next(error);
    }

    const organization = await Organization.findById(req.user.organization);
    if (!organization) {
      const error = new Error("Organization not found");
      error.status = 404;
      return next(error);
    }

    const {
      name,
      logoUrl,
      companyRegistrationNumber,
      taxId,
      billingEmail,
      currency,
      timezone,
      operationsProfile,
      integrations,
      compliance,
      support,
      customRoles,
    } = req.body;

    // Updatable fields
    if (name) organization.name = name;
    if (logoUrl !== undefined) organization.logoUrl = logoUrl;
    if (companyRegistrationNumber !== undefined) organization.companyRegistrationNumber = companyRegistrationNumber;
    if (taxId !== undefined) organization.taxId = taxId;
    if (billingEmail !== undefined) organization.billingEmail = billingEmail;
    if (currency) organization.currency = currency;
    if (timezone) organization.timezone = timezone;
    if (operationsProfile) organization.operationsProfile = { ...organization.operationsProfile, ...operationsProfile };
    if (integrations) organization.integrations = { ...organization.integrations, ...integrations };
    if (compliance) organization.compliance = { ...organization.compliance, ...compliance };
    if (support) organization.support = { ...organization.support, ...support };
    if (customRoles) organization.customRoles = customRoles;

    await organization.save();

    res.status(200).json({
      success: true,
      message: "Organization profile updated successfully",
      organization,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Transfer Enterprise Admin ownership to another active organization user
 * @route   POST /api/v1/organizations/transfer-ownership
 * @access  Protected (Enterprise Admin only)
 */
export const transferOwnership = async (req, res, next) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) {
      const error = new Error("Target user ID is required");
      error.status = 400;
      return next(error);
    }

    const organization = await Organization.findById(req.user.organization);
    if (!organization) {
      const error = new Error("Organization not found");
      error.status = 404;
      return next(error);
    }

    // Verify requesting user is the current primary admin
    if (organization.admin.toString() !== req.user._id.toString()) {
      const error = new Error("Only the primary Enterprise Admin can transfer ownership");
      error.status = 403;
      return next(error);
    }

    // Find the target user and ensure they belong to the same organization
    const targetUser = await User.findById(targetUserId);
    if (!targetUser || targetUser.organization.toString() !== organization._id.toString()) {
      const error = new Error("Target user not found in this organization");
      error.status = 404;
      return next(error);
    }

    // Update target user to enterpriseadmin
    targetUser.role = "enterpriseadmin";
    await targetUser.save();

    // Reassign organization admin
    organization.admin = targetUser._id;
    await organization.save();

    // Reassign previous admin role to manager
    const currentAdmin = await User.findById(req.user._id);
    currentAdmin.role = "manager";
    await currentAdmin.save();

    res.status(200).json({
      success: true,
      message: `Ownership successfully transferred to ${targetUser.fullname}`,
      organization,
    });
  } catch (error) {
    next(error);
  }
};
