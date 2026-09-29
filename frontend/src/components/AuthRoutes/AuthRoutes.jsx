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
    <div className="app-shell">
      {/* 1. HEADER */}
      <header className="app-header">
        <Header
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. SIDEBAR */}
        <aside
          className={`app-sidebar ${
            isSidebarExpanded ? "w-64" : "w-20"
          }`}
        >
          <Sidebar isExpanded={isSidebarExpanded} />
        </aside>

        {/* 3. MAIN CANVAS */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative app-canvas">
          <div className="min-h-full max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* 4. FOOTER */}
      <footer className="w-full flex-none bg-white border-t border-[var(--color-border-subtle)]">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthRoutes;
