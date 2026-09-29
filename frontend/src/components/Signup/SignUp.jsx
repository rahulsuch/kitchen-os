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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Register your Business
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join KitchenOS and establish your digital headquarters
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          
          {/* --- SECTION 1: Personal Profile --- */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">1. Enterprise Admin Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="johndoe_1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Admin Official Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="admin@brand.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* --- SECTION 2: Business Authenticity --- */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">2. Business Verification & Legal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Registered Brand / Company Name</label>
                <input
                  name="organizationName"
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Global Kitchens Ltd."
                />
              </div>

              <div>
                <label htmlFor="companyRegistrationNumber" className="block text-sm font-medium text-gray-700 mb-1">CIN / Registration No.</label>
                <input
                  name="companyRegistrationNumber"
                  type="text"
                  required
                  value={formData.companyRegistrationNumber}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="U12345MH2024PTC123456"
                />
              </div>

              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">Tax ID / GSTIN</label>
                <input
                  name="taxId"
                  type="text"
                  required
                  value={formData.taxId}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="27ABCDE1234F1Z5"
                />
              </div>

              <div>
                <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">Billing Email (Invoices)</label>
                <input
                  name="billingEmail"
                  type="email"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="accounts@brand.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">3. Initial Branch (Headquarters)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                <input
                  name="branchName"
                  type="text"
                  required
                  value={formData.branchName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Mumbai HQ"
                />
              </div>

              <div>
                <label htmlFor="fssaiNumber" className="block text-sm font-medium text-gray-700 mb-1">FSSAI License No.</label>
                <input
                  name="fssaiNumber"
                  type="text"
                  value={formData.fssaiNumber}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Required for Food Safety Logs"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-4 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
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
            <div className="rounded-md bg-red-50 p-3 border border-red-200">
              <p className="text-sm text-red-700 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Toggle View */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an enterprise account?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer focus:outline-none focus:underline"
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
