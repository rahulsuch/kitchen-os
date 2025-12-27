import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. 🛡️ Extract token from the HttpOnly Cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2. Check if token exists
    if (!token) {
      const error = new Error("Not authorized to access this resource. Please login.");
      error.status = 401;
      return next(error);
    }

    try {
      // 3. Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach User to Request
      // We exclude the password for security
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        const error = new Error("The user belonging to this token no longer exists.");
        error.status = 401;
        return next(error);
      }

      // 5. Check if user is active
      if (req.user.status === "inactive") {
        const error = new Error("Your account has been deactivated. Please contact support.");
        error.status = 403;
        return next(error);
      }

      next(); // Proceed to the controller
    } catch (err) {
      const error = new Error("Token is invalid or has expired.");
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 🛡️ Role Authorization Middleware
 * Use this to restrict specific routes to specific roles (e.g., Superadmin only)
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(`Role (${req.user.role}) is not allowed to access this resource`);
      error.status = 403; // Forbidden
      return next(error);
    }
    next();
  };
};