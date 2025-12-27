import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import {errorHandler} from '../middleware/errorMiddleware.js'

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
app.use(errorHandler)

// 5. Export using ES Modules logic
export default app;
