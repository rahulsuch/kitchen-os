import User from "../models/User.js";

/**
 * @desc    Update currently logged-in user's personal profile
 * @route   PUT /api/v1/users/me
 * @access  Protected
 */
export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    const {
      fullname,
      contactNo,
      gender,
      dateOfBirth,
      bloodGroup,
      address,
      emergencyContact,
      profilePicUrl,
      functionalTitle,
    } = req.body;

    if (fullname) user.fullname = fullname;
    if (contactNo !== undefined) user.contactNo = contactNo;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (bloodGroup) user.bloodGroup = bloodGroup;
    if (address) user.address = { ...user.address, ...address };
    if (emergencyContact) user.emergencyContact = { ...user.emergencyContact, ...emergencyContact };
    if (profilePicUrl !== undefined) user.profilePicUrl = profilePicUrl;
    if (functionalTitle !== undefined) user.functionalTitle = functionalTitle;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Personal profile updated successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo,
        functionalTitle: user.functionalTitle,
        organization: user.organization,
        branch: user.branch,
        gender: user.gender,
        address: user.address,
        profilePicUrl: user.profilePicUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change personal password
 * @route   PUT /api/v1/users/change-password
 * @access  Protected
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      const error = new Error("Please provide current and new password");
      error.status = 400;
      return next(error);
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      const error = new Error("Incorrect current password");
      error.status = 400;
      return next(error);
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
