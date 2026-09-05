import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(formData.email));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] flex items-center justify-center">
      <div className="bg-[#1a202c] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 mb-2 mx-1"
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
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all mb-4"
              placeholder="abc@outlook.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
