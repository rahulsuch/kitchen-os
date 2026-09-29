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
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border-subtle)] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success-subtle)]">
            <svg className="h-8 w-8 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-main)]">Password Reset Successful</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Your password has been updated. Redirecting you to login...
          </p>
          <div className="h-4 w-4 mx-auto animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border-subtle)]">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-main)]">
            Set New Password
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* New Password */}
            <div className="form-group">
              <label
                htmlFor="newPassword"
                className="form-label"
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
                className="input-control"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="form-label"
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
                className="input-control"
                placeholder="Re-enter your new password"
              />
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="form-error-banner">
              <p>{validationError}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={resetPasswordLoading}
              className="btn-primary w-full py-3 text-sm cursor-pointer"
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
            <p className="text-xs text-[var(--color-text-muted)]">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
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
