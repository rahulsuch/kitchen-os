import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardCheck, ShieldCheck, 
  FileText, Users, AlertCircle, LogOut, ChevronRight, ShieldUser 
} from 'lucide-react';
import { logoutAction } from '../../store/actions/authActions';
import { PERMISSIONS } from '../../../../shared/constants/Permissions';
import PermissionGuard from '../Guard/PermissionGuard';

const Sidebar = ({ isExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, loading } = useSelector((state) => state.auth);

  // PATHS UPDATED TO MATCH APPROUTES EXACTLY
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', permission: PERMISSIONS.VIEW_DASHBOARD },
    { icon: ClipboardCheck, label: 'Daily Logs', path: '/logs', permission: PERMISSIONS.VIEW_LOGS },
    { icon: ShieldCheck, label: 'FOSCOS Vault', path: '/foscos', permission: PERMISSIONS.MANAGE_FOSCOS },
    { icon: FileText, label: 'Certificates', path: '/certificates', permission: PERMISSIONS.VIEW_CERTIFICATES },
    { icon: Users, label: 'Staff & FoSTaC', path: '/staff', permission: PERMISSIONS.MANAGE_STAFF },
    { icon: AlertCircle, label: 'Incidents', path: '/incidents', permission: PERMISSIONS.REPORT_INCIDENTS },
    { icon: ShieldUser, label: 'Admin Panel', path: '/system-command', permission: PERMISSIONS.SYSTEM_MAINTENANCE },
    { icon: ShieldUser, label: 'Developer Progress', path: '/manifest-dashboard', permission: PERMISSIONS.SYSTEM_MAINTENANCE },
  ];

  if (loading || !user) return <div className="w-20 h-full bg-[#0d121b] border-r border-white/5" />;

  return (
    <div className={`flex flex-col h-full bg-[#0d121b] border-r border-white/5 transition-all duration-500 scrollbar-width-none ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}>
      
      {/* 1. BRANDING SECTION */}
      <div className="flex items-center h-20 px-6 mb-4">
        <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <ShieldCheck className="text-white" size={20} />
        </div>
        {isExpanded && (
          <div className="ml-3 overflow-hidden">
            <h1 className="font-bold text-white text-base leading-tight tracking-tight">
              Compliance<span className="text-cyan-400">OS</span>
            </h1>
            <p className="text-[9px] text-cyan-500/50 uppercase tracking-[0.2em] font-black">Admin Core</p>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION SECTION */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <PermissionGuard key={item.path} permission={item.permission}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                }`}
              >
                {/* Active Glow Effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-cyan-500/5 blur-xl pointer-events-none" />
                )}

                <div className={`flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:scale-110'}`}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {isExpanded && (
                  <span className={`ml-3 text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                )}
                
                {isExpanded && isActive && (
                  <div className="ml-auto flex items-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
                  </div>
                )}
              </button>
            </PermissionGuard>
          );
        })}
      </nav>

      {/* 3. USER & LOGOUT SECTION */}
      <div className="p-4 mt-auto border-t border-white/5 bg-white/[0.02]">
        <button
          onClick={() => dispatch(logoutAction())}
          className="w-full flex items-center p-3 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all group border border-transparent hover:border-rose-500/20"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          {isExpanded && (
            <div className="ml-3 text-left">
              <p className="font-bold text-[10px] uppercase tracking-widest">Sign Out</p>
              <p className="text-[9px] text-slate-600 font-mono">Terminate Session</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;