import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forgotPasswordLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPasswordAction(formData.email));
      setEmailSent(true);
    } catch (err) {
      // Error toast is handled by toastMiddleware automatically
    }
  };

  // Success state — email has been sent
  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border-subtle)] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-subtle)]">
            <svg className="h-8 w-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-main)]">Check Your Email</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            We've sent a password reset link to <strong>{formData.email}</strong>. 
            The link will expire in 10 minutes.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] opacity-75">
            Didn't receive it? Check your spam folder or try again.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
          >
            ← Back to Login
          </button>
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
            Forgot Password
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-control"
              placeholder="you@example.com"
            />
          </div>

          {/* Error Feedback */}
          {error && (
            <div className="form-error-banner">
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={forgotPasswordLoading}
              className="btn-primary w-full py-3 text-sm cursor-pointer"
            >
              {forgotPasswordLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
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
}

export default ForgotPassword;
