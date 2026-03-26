import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();
const PORT = process.env.PORT || 3010;

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://localhost:3002"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Better Auth handles all /api/auth/* routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
