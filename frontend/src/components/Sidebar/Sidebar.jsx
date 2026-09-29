import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardCheck, ShieldCheck, 
  FileText, Users, AlertCircle, LogOut, ChevronRight, ShieldUser,
  Building2, User 
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
    { icon: Building2, label: 'Org Settings', path: '/organization-settings', permission: PERMISSIONS.VIEW_DASHBOARD },
    { icon: User, label: 'My Profile', path: '/profile', permission: PERMISSIONS.VIEW_DASHBOARD },
    { icon: ShieldUser, label: 'Admin Panel', path: '/system-command', permission: PERMISSIONS.SYSTEM_MAINTENANCE },
    { icon: ShieldUser, label: 'Developer Progress', path: '/manifest-dashboard', permission: PERMISSIONS.SYSTEM_MAINTENANCE },
  ];

  if (loading || !user) return <div className="w-20 h-full bg-[var(--color-surface)] border-r border-[var(--color-border-subtle)]" />;

  return (
    <div className={`flex flex-col h-full overflow-x-hidden bg-[var(--color-surface)] border-r border-[var(--color-border-subtle)] transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}>
      
      {/* 1. BRANDING SECTION */}
      <div className="flex items-center h-20 px-5 mb-2 border-b border-[var(--color-border-subtle)]">
        <div className="w-9 h-9 bg-[var(--color-primary)] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm">
          <ShieldCheck size={20} />
        </div>
        {isExpanded && (
          <div className="ml-3 overflow-hidden">
            <h1 className="font-bold text-[var(--color-text-main)] text-base leading-tight">
              Compliance<span className="text-[var(--color-primary)]">OS</span>
            </h1>
            <p className="text-[10px] text-[var(--color-text-muted)] font-semibold tracking-wider uppercase">Kitchen Operations</p>
          </div>
        )}
      </div>

      {/* 2. NAVIGATION SECTION */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <PermissionGuard key={item.path} permission={item.permission}>
              <button
                onClick={() => navigate(item.path)}
                className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
              >
                <div className="flex-shrink-0">
                  <Icon size={18} />
                </div>

                {isExpanded && (
                  <span className="ml-3 text-xs tracking-wide truncate font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            </PermissionGuard>
          );
        })}
      </nav>

      {/* 3. USER & LOGOUT SECTION */}
      <div className="p-3 border-t border-[var(--color-border-subtle)]">
        <button
          onClick={() => dispatch(logoutAction())}
          className="sidebar-item hover:text-[var(--color-critical)] text-xs font-medium"
        >
          <LogOut size={18} className="flex-shrink-0 text-[var(--color-text-muted)]" />
          {isExpanded && (
            <span className="ml-3 font-semibold truncate">Sign Out</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;