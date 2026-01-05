import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Added for Security Headers
import rateLimit from "express-rate-limit"; // Added for Brute-force protection
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from '../middleware/errorMiddleware.js';

const app = express();

// 1. Security Headers (The Dec 15th Optimization)
app.use(helmet()); 

// 2. Rate Limiting (Protects your Auth routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/", limiter);

// 3. Dynamic CORS
app.use(
  cors({
    // When deploying, replace this with your Vercel/Netlify URL
    origin: process.env.NODE_ENV === "production" 
            ? process.env.FRONTEND_URL 
            : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" })); // Security: Limit body size to prevent DoS
app.use(cookieParser());

// 🛡️ Global Cookie Security (The "Dec 15th" optimization for Cross-Domain sessions)
app.use((req, res, next) => {
  const originalCookie = res.cookie;
  res.cookie = (name, value, options) => {
    if (process.env.NODE_ENV === "production") {
      options = {
        ...options,
        httpOnly: true,    // Protects against XSS
        secure: true,      // Mandatory for SameSite=None
        sameSite: "none",  // Allows Vercel to send cookies to Render
        partitioned: true, // 🛡️ 2026 CHIPS: Prevents 401 on refresh
      };
    }
    return originalCookie.call(res, name, value, options);
  };
  next();
});

// 4. Specific Feature Routes
app.use("/api/v1/auth", authRoutes);

// 5. Error Handling Middleware (MUST BE LAST)
app.use(errorHandler);

export default app;