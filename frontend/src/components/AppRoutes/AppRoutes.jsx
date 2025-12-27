import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 🔑 Needed to get user role
import { Toaster } from "react-hot-toast";

import { PERMISSIONS } from "../../../../shared/constants/Permissions";
import PermissionGuard from "../Guard/PermissionGuard";
import AuthRoutes from "../AuthRoutes/AuthRoutes";

// Pages
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import FoscosVault from "../FoscosVault/FoscosVault";
import Unauthorized from '../Unauthorized/Unauthorized' // 🛡️ Import the new page

function AppRoutes() {
  // Get auth state from Redux
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // While loading user from cookie, show nothing or a spinner
  if (loading) return <div>Loading ...</div>;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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

        {/* FOSCOS VAULT: Auth + Specific Permission Required */}
        <Route
          path="/foscos"
          element={
            <AuthRoutes>
              {/* 🛡️ 2025-12-15 Solution: PermissionGuard handles the redirect */}
              <PermissionGuard
                permission={PERMISSIONS.MANAGE_FOSCOS}
                isPage={true}
              >
                <FoscosVault />
              </PermissionGuard>
            </AuthRoutes>
          }
        />

        {/* CATCH ALL: Redirect unknown paths to Home or Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
