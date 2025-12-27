// src/middleware/toastMiddleware.js
import { toast } from "react-hot-toast";

export const toastMiddleware = (store) => (next) => (action) => {
  // 1. Handle Errors (Tailored to your SIGNUP_FAILURE naming)
  if (action.type.endsWith("_FAILURE") || action.type.endsWith("_REJECTED")) {
    // 🛡️ SECURITY & UX: Extract the message safely

    if (action.type === 'USER_LOAD_FAILURE') {
        return next(action); 
    }
    const errorMessage = action.payload || "An unexpected error occurred";
    toast.error(errorMessage);

    // If the backend returns 401 (Unauthorized), the user's cookie is invalid
    if (
      action.payload?.includes("401") ||
      action.payload?.includes("Unauthorized")
    ) {
      toast.error("Security: Session expired. Logging out...");
      store.dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }

  if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FULFILLED")) {
    // Success Toasts
    const successMessage = action.payload?.message || "Operation successful";
    toast.success(successMessage);
    console.log('action.payload:', action.payload);
  }

  return next(action);
};
