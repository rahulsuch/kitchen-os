import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupaction } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    organizationName: '',
    branchName: '',
    fssaiNumber: '',
    companyRegistrationNumber: '',
    taxId: '',
    billingEmail: '',
    currency: 'INR',
    timezone: 'Asia/Kolkata'
  });

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if registration is successful
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    dispatch(signupaction(formData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border-subtle)]">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-main)]">
            Register your Business
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            Join KitchenOS and establish your digital headquarters
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          
          {/* --- SECTION 1: Personal Profile --- */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] border-b border-[var(--color-border-subtle)] pb-2 mb-4">
              1. Enterprise Admin Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="johndoe_1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Admin Official Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="admin@brand.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* --- SECTION 2: Business Authenticity --- */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] border-b border-[var(--color-border-subtle)] pb-2 mb-4">
              2. Business Verification & Legal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 form-group">
                <label htmlFor="organizationName" className="form-label">Registered Brand / Company Name</label>
                <input
                  name="organizationName"
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="Global Kitchens Ltd."
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyRegistrationNumber" className="form-label">CIN / Registration No.</label>
                <input
                  name="companyRegistrationNumber"
                  type="text"
                  required
                  value={formData.companyRegistrationNumber}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="U12345MH2024PTC123456"
                />
              </div>

              <div className="form-group">
                <label htmlFor="taxId" className="form-label">Tax ID / GSTIN</label>
                <input
                  name="taxId"
                  type="text"
                  required
                  value={formData.taxId}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="27ABCDE1234F1Z5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="billingEmail" className="form-label">Billing Email (Invoices)</label>
                <input
                  name="billingEmail"
                  type="email"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="accounts@brand.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="form-group">
                  <label htmlFor="currency" className="form-label">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="select-control"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timezone" className="form-label">Timezone</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="select-control"
                  >
                    <option value="Asia/Kolkata">IST (Kolkata)</option>
                    <option value="UTC">UTC (Global)</option>
                    <option value="America/New_York">EST (New York)</option>
                    <option value="Europe/London">GMT (London)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 3: Initial Branch --- */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] border-b border-[var(--color-border-subtle)] pb-2 mb-4">
              3. Initial Branch (Headquarters)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="branchName" className="form-label">Branch Name</label>
                <input
                  name="branchName"
                  type="text"
                  required
                  value={formData.branchName}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="Mumbai HQ"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fssaiNumber" className="form-label">FSSAI License No.</label>
                <input
                  name="fssaiNumber"
                  type="text"
                  value={formData.fssaiNumber}
                  onChange={handleChange}
                  className="input-control"
                  placeholder="Required for Food Safety Logs"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[var(--color-border-subtle)]">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-sm cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"> </div>
                  Provisioning System Instance...
                </span>
              ) : (
                "Establish Enterprise Account"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="form-error-banner">
              <p>{error}</p>
            </div>
          )}

          {/* Toggle View */}
          <div className="text-center">
            <p className="text-xs text-[var(--color-text-muted)]">
              Already have an enterprise account?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
              >
                Sign in to Admin Core
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
