import { useDispatch, useSelector } from "react-redux";
import { Menu, Bell, User, ShieldCheck, Search, Building2, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actions/authActions";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const isEnterpriseAdmin = user?.role === "enterpriseadmin" || user?.role === "superadmin";

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[var(--color-surface)]">
      {/* Left: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-muted)] cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:flex items-center bg-[var(--color-surface-subtle)] px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] focus-within:border-[var(--color-primary)]">
          <Search size={16} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search logs or docs..."
            className="bg-transparent border-none text-xs ml-2 w-64 outline-none text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Center: Compliance Status Indicator */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-success">
        <ShieldCheck size={16} />
        <span className="text-xs font-semibold">
          Audit Ready: 98% Score
        </span>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] rounded-full cursor-pointer transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-critical)] rounded-full border-2 border-[var(--color-surface)]"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 pl-4 border-l border-[var(--color-border-subtle)] text-left hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[var(--color-text-main)] leading-tight">
                {user?.fullname || "Loading..."}
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                {user?.role?.replace("_", " ") || "ADMIN"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white font-bold shadow-sm text-sm">
              {user?.fullname?.charAt(0) || <User size={18} />}
            </div>
            <ChevronDown size={14} className="text-[var(--color-text-muted)] hidden sm:block" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border-subtle)] py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-[var(--color-border-subtle)]">
                <p className="text-xs font-bold text-[var(--color-text-main)]">{user?.fullname}</p>
                <p className="text-[11px] text-[var(--color-text-muted)] truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
              >
                <UserCircle size={16} className="text-[var(--color-text-muted)]" />
                My Profile
              </button>

              {isEnterpriseAdmin && (
                <button
                  onClick={() => {
                    navigate("/organization-settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
                >
                  <Building2 size={16} className="text-[var(--color-text-muted)]" />
                  Organization Settings
                </button>
              )}

              <hr className="my-1 border-[var(--color-border-subtle)]" />

              <button
                onClick={() => {
                  dispatch(logoutAction());
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[var(--color-critical)] hover:bg-[var(--color-critical-subtle)] transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
