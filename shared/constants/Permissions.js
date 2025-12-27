export const ROLES = {
  SUPER_ADMIN: 'superadmin',
  ENTERPRISE: 'enterpriseadmin',
  BRANCH_ADMIN: 'branchadmin',
  STAFF: 'staff',
};

export const PERMISSIONS = {
  // Sidebar Specific Permissions
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_LOGS: 'view_logs',
  MANAGE_FOSCOS: 'manage_foscos',
  VIEW_CERTIFICATES: 'view_certificates',
  MANAGE_STAFF: 'manage_staff',
  REPORT_INCIDENTS: 'report_incidents',
  
  // System/Action Permissions
  SYSTEM_MAINTENANCE: 'system_maintenance',
  APPROVE_STAFF: 'approve_staff',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  
  [ROLES.ENTERPRISE]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_LOGS,
    PERMISSIONS.VIEW_CERTIFICATES,
    PERMISSIONS.REPORT_INCIDENTS
  ],

  [ROLES.BRANCH_ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_LOGS,
    PERMISSIONS.MANAGE_FOSCOS, // Managers usually handle branch vault
    PERMISSIONS.VIEW_CERTIFICATES,
    PERMISSIONS.MANAGE_STAFF,
    PERMISSIONS.REPORT_INCIDENTS
  ],

  [ROLES.STAFF]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_LOGS,
    PERMISSIONS.REPORT_INCIDENTS
  ],
};