import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 1. Global Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Adjust origin as needed
app.use(express.json());
app.use(cookieParser());

// 3. Specific Feature Routes
// Note: We used /api/v1/auth earlier for versioning consistency
app.use("/api/v1/auth", authRoutes);

// 4. Error Handling Middleware (MUST BE LAST)
// It acts as the "Safety Net" at the bottom of the stack.
app.use((err, req, res, next) => {
  // 1. Log the error for you (the developer) to see in the terminal
  console.error(err.stack);

  // 2. Determine the status code (default to 500 if not specified)
  const statusCode = err.status || 500;

  // 3. Send the final response to the user
  res.status(statusCode).json({
    status: "error",
    message: err.message || "An Internal Server Error Occurred",
    // 🛡️ SECURITY: Only show the technical details in Development mode
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

// 5. Export using ES Modules logic
export default app;
