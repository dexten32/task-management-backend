import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import departmentRoutes from "./routes/departmentRoutes";
import roleRoutes from "./routes/userRoutes";
import { PrismaClient } from "@prisma/client";
import logsRoutes from "./routes/logsRoutes";

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Mount API routes

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/logs", logsRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global error handler:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
);

export default app;
