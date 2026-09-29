import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Shield,
  Lock,
  Building,
  Save,
  CheckCircle,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import {
  updateMyProfileAction,
  changePasswordAction,
} from "../../store/actions/userProfileActions";
import toast from "react-hot-toast";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullname: "",
    username: "",
    email: "",
    contactNo: "",
    functionalTitle: "",
    gender: "prefer_not_to_say",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
        functionalTitle: user.functionalTitle || "",
        gender: user.gender || "prefer_not_to_say",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          pincode: user.address?.pincode || "",
          country: user.address?.country || "India",
        },
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await dispatch(updateMyProfileAction(profileForm));
      toast.success("Personal profile updated successfully!");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);
    try {
      await dispatch(
        changePasswordAction({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        })
      );
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* 1. HEADER & IDENTITY CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-cyan-600/30">
          {profileForm.fullname?.charAt(0) || "U"}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{profileForm.fullname}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200">
              {user?.role || "Enterprise Admin"}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            @{profileForm.username} • {profileForm.email}
          </p>
        </div>
      </div>

      {/* 2. PERSONAL DETAILS FORM */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <User className="text-cyan-600" size={20} />
          <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profileForm.fullname}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, fullname: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Personal Contact Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={profileForm.contactNo}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, contactNo: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Functional Title / Designation
              </label>
              <input
                type="text"
                placeholder="e.g. Managing Director / Founder"
                value={profileForm.functionalTitle}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, functionalTitle: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Gender
              </label>
              <select
                value={profileForm.gender}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, gender: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="prefer_not_to_say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={savingProfile}
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
            >
              {savingProfile ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              {savingProfile ? "Saving Profile..." : "Save Personal Info"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. SECURITY & CHANGE PASSWORD */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <KeyRound className="text-cyan-600" size={20} />
          <h2 className="text-lg font-bold text-slate-900">Security & Credentials</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                placeholder="Repeat new password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={changingPassword}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {changingPassword ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <Lock size={16} />
              )}
              {changingPassword ? "Updating Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
