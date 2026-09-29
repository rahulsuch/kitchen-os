import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginaction } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redirect if login is successful
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Adjust this to your dashboard route
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginaction(formData));
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border-subtle)]">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-main)]">
            Welcome Back
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            Log in to manage your KitchenOS
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="form-group">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="form-label !mb-0"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-control"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Error Feedback */}
          {error && (
            <div className="form-error-banner">
              <p>{error}</p>
            </div>
          )}

          {/* Footer Toggle */}
          <div className="text-center">
            <p className="text-xs text-[var(--color-text-muted)]">
              Not a registered Business?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
