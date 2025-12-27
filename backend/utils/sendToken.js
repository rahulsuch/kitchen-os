const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken(); // Method defined in your User model

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // 🛡️ Prevents XSS (JavaScript cannot read this)
    secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in prod
    sameSite: "Lax", // Protects against CSRF
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role, // 🔑 Essential for Sidebar logic
      organization: user.organization,
      branch: user.branch,
    },
  });
};

export default sendToken;