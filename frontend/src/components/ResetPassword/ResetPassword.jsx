import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../store/actions/authActions";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetPasswordLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Client-side validation
    if (formData.newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      await dispatch(resetPasswordAction(token, formData.newPassword));
      setResetSuccess(true);
      // Navigate to login after a short delay so user sees the success state
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      // Error toast is handled by toastMiddleware automatically
    }
  };

  // Success state
  if (resetSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful</h2>
          <p className="text-sm text-gray-600">
            Your password has been updated. Redirecting you to login...
          </p>
          <div className="h-4 w-4 mx-auto animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={6}
                value={formData.newPassword}
                onChange={handleChange}
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="Re-enter your new password"
              />
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="rounded-md bg-red-50 p-3 border border-red-100">
              <p className="text-sm text-red-700 text-center font-medium">
                {validationError}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={resetPasswordLoading}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
            >
              {resetPasswordLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer focus:outline-none focus:underline"
              >
                Back to Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
