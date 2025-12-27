import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardCheck, ShieldCheck, 
  FileText, Users, AlertCircle, LogOut, ChevronRight 
} from 'lucide-react';
import { logoutAction } from '../../store/actions/authActions';
import { PERMISSIONS } from '../../../../shared/constants/Permissions';
import PermissionGuard from '../Guard/PermissionGuard';

const Sidebar = ({ isExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  console.log("SIDEBAR AUTH CHECK:", { 
  role: user?.role, 
  loading, 
  isAuthenticated: !!user 
});

  // Updated menuItems to match the PERMISSIONS keys exactly
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', permission: PERMISSIONS.VIEW_DASHBOARD },
    { icon: ClipboardCheck, label: 'Daily Logs', path: '/logs', permission: PERMISSIONS.VIEW_LOGS },
    { icon: ShieldCheck, label: 'FOSCOS Vault', path: '/foscos', permission: PERMISSIONS.MANAGE_FOSCOS },
    { icon: FileText, label: 'Certificates', path: '/certificates', permission: PERMISSIONS.VIEW_CERTIFICATES },
    { icon: Users, label: 'Staff & FoSTaC', path: '/staff', permission: PERMISSIONS.MANAGE_STAFF },
    { icon: AlertCircle, label: 'Incidents', path: '/incidents', permission: PERMISSIONS.REPORT_INCIDENTS },
  ];

  // Prevent rendering items if auth data is still being fetched
  if (loading) return <div className="w-16 h-full bg-white border-r border-slate-100" />;

  return (
    <div className="flex flex-col h-full bg-white transition-all duration-300 ease-in-out">
      
      {/* 1. BRANDING SECTION */}
      <div className="flex items-center h-16 px-6 border-b border-slate-100 mb-4">
        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-100">
          <ShieldCheck className="text-white" size={22} />
        </div>
        {isExpanded && (
          <div className="ml-3 overflow-hidden">
            <h1 className="font-bold text-slate-800 text-lg leading-tight truncate">
              Compliance<span className="text-emerald-600">OS</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Standard v1.0</p>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION SECTION */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <PermissionGuard key={item.path} permission={item.permission}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-r-full" />
                )}

                <div className={`flex-shrink-0 ${isActive ? 'text-emerald-600' : 'group-hover:text-slate-900'}`}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {isExpanded && (
                  <span className="ml-3 font-semibold text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                
                {isExpanded && isActive && (
                  <ChevronRight size={14} className="ml-auto opacity-50" />
                )}
              </button>
            </PermissionGuard>
          );
        })}
      </nav>

      {/* 3. USER & LOGOUT SECTION */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        {isExpanded && user && (
            <div className="px-3 py-2 mb-2">
                <p className="text-xs font-bold text-slate-800 truncate">{user.fullname}</p>
                <p className="text-[10px] text-emerald-600 font-medium uppercase">{user.role.replace('_', ' ')}</p>
            </div>
        )}
        <button
          onClick={() => dispatch(logoutAction())}
          className="w-full flex items-center p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          {isExpanded && (
            <div className="ml-3 text-left">
              <p className="font-bold text-xs">Sign Out</p>
              <p className="text-[10px] text-slate-400">End Session</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;