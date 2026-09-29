import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const AuthRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // 🛡️ Manage sidebar expansion
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600">
          Loading...
        </div>
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    // 🛡️ Root container: Stack Header, Middle Section, and Footer vertically
    // ... inside AuthRoutes return
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100 text-slate-900">
      {/* 1. HEADER border: Change border-b to border-gray-100 */}
      <header className="z-50 w-full flex-none bg-grey-900 border-b border-gray-100 shadow-sm">
        <Header
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. SIDEBAR border: Change border-r to border-gray-100 */}
        <aside
          className={`h-full flex-none border-r border-gray-100 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
            isSidebarExpanded ? "w-64" : "w-20"
          }`}
        >
          <Sidebar isExpanded={isSidebarExpanded} />
        </aside>

        <main className={`flex-1 overflow-y-auto overflow-x-hidden relative ${
          (location.pathname === "/system-command" || location.pathname === "/manifest-dashboard") ? "bg-[#05070a]" : "bg-[#F9FAFB]"
        }`}>
          <div className={`min-h-full ${
            (location.pathname === "/system-command" || location.pathname === "/manifest-dashboard") ? "w-full" : "max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10"
          }`}>
            {children}
          </div>
        </main>
      </div>

      {/* 3. FOOTER border: Change border-t to border-gray-100 */}
      <footer className="z-50 w-full flex-none bg-white border-t border-gray-100">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthRoutes;
