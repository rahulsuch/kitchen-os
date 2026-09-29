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
      <div className="app-card flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
          {profileForm.fullname?.charAt(0) || "U"}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-xl font-bold text-[var(--color-text-main)]">{profileForm.fullname}</h1>
            <span className="badge-base badge-primary">
              {user?.role || "Enterprise Admin"}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            @{profileForm.username} • {profileForm.email}
          </p>
        </div>
      </div>

      {/* 2. PERSONAL DETAILS FORM */}
      <div className="app-card sm:p-8">
        <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border-subtle)] pb-4">
          <User className="text-[var(--color-primary)]" size={18} />
          <h2 className="text-base font-bold text-[var(--color-text-main)]">Personal Information</h2>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profileForm.fullname}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, fullname: e.target.value })
                }
                className="input-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Personal Contact Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={profileForm.contactNo}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, contactNo: e.target.value })
                }
                className="input-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Functional Title / Designation
              </label>
              <input
                type="text"
                placeholder="e.g. Managing Director / Founder"
                value={profileForm.functionalTitle}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, functionalTitle: e.target.value })
                }
                className="input-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Gender
              </label>
              <select
                value={profileForm.gender}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, gender: e.target.value })
                }
                className="select-control"
              >
                <option value="prefer_not_to_say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--color-border-subtle)]">
            <button
              type="submit"
              disabled={savingProfile}
              className="btn-primary"
            >
              {savingProfile ? (
                <RefreshCw className="animate-spin" size={14} />
              ) : (
                <Save size={14} />
              )}
              {savingProfile ? "Saving Profile..." : "Save Personal Info"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. SECURITY & CHANGE PASSWORD */}
      <div className="app-card sm:p-8">
        <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border-subtle)] pb-4">
          <KeyRound className="text-[var(--color-primary)]" size={18} />
          <h2 className="text-base font-bold text-[var(--color-text-main)]">Security & Credentials</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">
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
                className="input-control text-xs"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
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
                className="input-control text-xs"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
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
                className="input-control text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--color-border-subtle)]">
            <button
              type="submit"
              disabled={changingPassword}
              className="btn-primary"
            >
              {changingPassword ? (
                <RefreshCw className="animate-spin" size={14} />
              ) : (
                <Lock size={14} />
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
