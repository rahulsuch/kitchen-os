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
    <div className="flex items-center justify-between px-6 py-3 bg-white">
      {/* Left: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-md focus-within:border-black border border-gray-200">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search logs or docs..."
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-64 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Center: Compliance Status Indicator */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-200">
        <ShieldCheck size={18} className="text-green-600" />
        <span className="text-sm font-semibold text-green-700">
          Audit Ready: 98% Score
        </span>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 pl-4 border-l border-gray-200 text-left hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {user?.fullname || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {user?.role?.replace("_", " ") || "ADMIN"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold shadow-inner">
              {user?.fullname?.charAt(0) || <User size={20} />}
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-800">{user?.fullname}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
              >
                <UserCircle size={16} />
                My Profile
              </button>

              {isEnterpriseAdmin && (
                <button
                  onClick={() => {
                    navigate("/organization-settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                >
                  <Building2 size={16} />
                  Organization Settings
                </button>
              )}

              <hr className="my-1 border-gray-100" />

              <button
                onClick={() => {
                  dispatch(logoutAction());
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
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
