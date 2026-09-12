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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
          <p className="text-sm text-gray-600">
            We've sent a password reset link to <strong>{formData.email}</strong>. 
            The link will expire in 10 minutes.
          </p>
          <p className="text-xs text-gray-400">
            Didn't receive it? Check your spam folder or try again.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer focus:outline-none focus:underline"
          >
            ← Back to Login
          </button>
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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* Error Feedback */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 border border-red-100">
              <p className="text-sm text-red-700 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={forgotPasswordLoading}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
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
}

export default ForgotPassword;
