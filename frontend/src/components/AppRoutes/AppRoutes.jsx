import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 🔑 Needed to get user role
import { Toaster } from "react-hot-toast";

import { PERMISSIONS } from "../../../../shared/constants/Permissions";
import PermissionGuard from "../Guard/PermissionGuard";
import AuthRoutes from "../AuthRoutes/AuthRoutes";

// Pages
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Home from "../Home/Home";
import FoscosVault from "../FoscosVault/FoscosVault";
import Unauthorized from "../Unauthorized/Unauthorized"; // 🛡️ Import the new page
import Newuser from "../Dashboards/Newuser";
import DailyLogs from "../DailyLogs/DailyLogs";
import CertificatesDashboard from "../Certificates/CertificatesDashboard";
import StaffDashboard from "../StaffDashboard/StaffDashboard";
import Incidents from "../Incidents/Incidents";
import ManifestDashboard from "../ManifestDashboard/ManifestDashboard";
import OrganizationSettings from "../OrganizationSettings/OrganizationSettings";
import UserProfile from "../UserProfile/UserProfile";

function AppRoutes() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* DASHBOARD: Basic Auth Required */}
        <Route
          path="/"
          element={
            <AuthRoutes>
              <Home />
            </AuthRoutes>
          }
        />

        {/* USER PROFILE: Personal account management */}
        <Route
          path="/profile"
          element={
            <AuthRoutes>
              <UserProfile />
            </AuthRoutes>
          }
        />

        {/* ORGANIZATION SETTINGS: Enterprise tenant management */}
        <Route
          path="/organization-settings"
          element={
            <AuthRoutes>
              <OrganizationSettings />
            </AuthRoutes>
          }
        />

        {/* FOSCOS VAULT: MANAGE_FOSCOS Permission */}
        <Route
          path="/foscos"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.MANAGE_FOSCOS}
                isPage={true}
              >
                <FoscosVault />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* SYSTEM COMMAND (Newuser): SYSTEM_MAINTENANCE Permission */}
        <Route
          path="/system-command"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.SYSTEM_MAINTENANCE}
                isPage={true}
              >
                <Newuser />
              </PermissionGuard>
            </AuthRoutes>
          }
        />
        <Route
          path="/manifest-dashboard"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.SYSTEM_MAINTENANCE}
                isPage={true}
              >
                <ManifestDashboard />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* DAILY LOGS: VIEW_LOGS Permission */}
        <Route
          path="/logs"
          element={
            <AuthRoutes>
              <PermissionGuard permission={PERMISSIONS.VIEW_LOGS} isPage={true}>
                <DailyLogs />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* CERTIFICATES: VIEW_CERTIFICATES Permission */}
        <Route
          path="/certificates"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.VIEW_CERTIFICATES}
                isPage={true}
              >
                <CertificatesDashboard />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* STAFF & FOSTAC: MANAGE_STAFF Permission */}
        <Route
          path="/staff"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.MANAGE_STAFF}
                isPage={true}
              >
                <StaffDashboard />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* INCIDENTS: REPORT_INCIDENTS Permission */}
        <Route
          path="/incidents"
          element={
            <AuthRoutes>
              <PermissionGuard
                permission={PERMISSIONS.REPORT_INCIDENTS}
                isPage={true}
              >
                <Incidents />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
