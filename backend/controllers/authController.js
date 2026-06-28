import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Branch from "../models/Branch.js";
import sendToken from "../utils/sendToken.js";
import emailService from "../utils/emailService.js";

/**
 * @desc    Register a new basic user
 * @route   POST /api/v1/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const { fullname, username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.status = 400;
      return next(error);
    }

    const user = await User.create({
      fullname,
      username,
      email,
      password,
    });

    // 🛡️ Automatically handles JWT generation and HttpOnly cookie
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/v1/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please provide email and password");
      error.status = 400;
      return next(error);
    }

    // Find user & include password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return next(error);
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / Clear Cookie
 * @route   GET /api/v1/auth/logout
 */
export const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/**
 * @desc    Get currently logged in user details
 * @route   GET /api/v1/auth/me
 */
export const getme = async (req, res, next) => {
  try {
    // req.user is populated by 'protect' middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      user, // Contains role, org, and branch for Sidebar scoping
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Complex Registration: Creates Org, Branch, and Owner User
 * @route   POST /api/v1/auth/register-business
 */
export const registerBusiness = async (req, res, next) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      organizationName,
      branchName,
      fssaiNumber,
    } = req.body;

    // 1. Check if user already exists before doing heavy DB work
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User with this email already exists");
      error.status = 400;
      return next(error);
    }

    // 2. Create the Organization (The Brand)
    const newOrg = await Organization.create({
      name: organizationName,
    });

    // 3. Create the first Branch (The Kitchen)
    const newBranch = await Branch.create({
      name: branchName,
      organization: newOrg._id,
      fssaiLicenseNumber: fssaiNumber || "PENDING",
    });

    // 4. Create the User (The Owner)
    // role 'enterprise' matches our Permissions.js logic
    const user = await User.create({
      fullname,
      username,
      email,
      password,
      role: "enterpriseadmin", 
      status: "active",
      organization: newOrg._id,
      branch: newBranch._id,
    });

    // 5. Link Admin/Manager refs back to Org and Branch
    newOrg.admin = user._id;
    await newOrg.save();

    newBranch.manager = user._id;
    await newBranch.save();

    // 6. Finalize: Send Token to log them in immediately
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Forgot Password - Send Reset Token
 * @route   POST /api/v1/auth/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      const error = new Error("User with this email does not exist");
      error.status = 400;
      return next(error);
    }
    await emailService.sendResetPasswordEmail(userExists.email, userExists.resetPasswordToken);
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resets the user's password using a valid reset token.
 * @param {newPassword} newPassword 
 * @description Resets the user's password using a valid reset token. The token is verified against the database, and if valid, the user's password is updated. The reset token and its expiration are cleared after a successful reset.
 * @route POST /api/v1/auth/reset-password 
 * @returns {Object} The updated user object
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) {
      const error = new Error("Invalid or expired password reset token");
      error.status = 400;
      return next(error);
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
