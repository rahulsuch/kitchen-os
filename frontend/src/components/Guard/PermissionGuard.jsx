import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLE_PERMISSIONS } from '../../../../shared/constants/Permissions';

const PermissionGuard = ({ children, permission, isPage = false }) => {
  const { user } = useSelector((state) => state.auth);

  const userPermissions = ROLE_PERMISSIONS[user?.role] || [];
  const hasPermission = userPermissions.includes(permission);

  if (!hasPermission) {
    // 🛡️ If it's a route/page, redirect them. If it's a button, hide it.
    return isPage ? <Navigate to="/unauthorized" replace /> : null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
