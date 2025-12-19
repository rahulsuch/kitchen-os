import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
apiClient.interceptors.request.use(
  (config) => {
    //add auth token to the request headers if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => { // Runs for all 2xx status codes
    // Optional: Data Transformation
    // If your server wraps data (e.g., { status: 'ok', payload: { ... } }),
    // you can unwrap it here for cleaner component code.
    // response.data = response.data.payload;

    return response; // Pass the successful response down the chain
  },
  async (error) => {// Runs for all non-2xx status codes (4xx, 5xx) and network errors
    // Check if the error object contains a server response
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || status === 403) {// 🛑 CRITICAL: Global 401/403 Handling
        console.error(
          `Status ${status}: Authentication Failure Detected. Clearing session.`
        );
        localStorage.removeItem("authToken");// Clear the stale token from localStorage

        // Add logic to redirect the user to the login page
        // Example: window.location.href = '/login';

        // You can return a new rejected Promise here to stop the
        // original calling function from proceeding:
        return Promise.reject("Session Expired. Please log in again.");
      }

      // General Server Error Handling (400, 500, etc.)
      // We are transforming the complex error object into a simpler message
      const serverMessage =
        data.message || data.error || `Server Error (${status})`;
      return Promise.reject(serverMessage);
    } else if (error.request) {
      // Error occurred but no response was received (e.g., network down, timeout)
      console.error("Network Error: Server appears to be unreachable.");
      return Promise.reject("Network Error: Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Client-side Axios Error:", error.message);
      return Promise.reject(`Client Error: ${error.message}`);
    }
  }
);
export default apiClient;
