import { useState, useEffect, useRef } from "react"; // 🛡️ Added useRef
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { loadUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // 🛡️ Use a Ref to track if we've initialized. 
  // This stays 'true' even if the component re-renders during logout.
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      dispatch(loadUser());
      isInitialized.current = true; // 🛡️ Mark as initialized immediately
    }
  }, [dispatch]);

  // Only show the global loader during the VERY FIRST check
  if (loading && !isInitialized.current) return <div> Loading... </div>;

  return (
    <div className="App">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;