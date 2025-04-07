import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { db } from "./db";
console.log("🔥 App is starting up...");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log("🔥 App is starting up...");

    await storage.initializeDefaultPlans();
    console.log("✅ Database initialized");

    await registerRoutes(app);
    console.log("✅ Routes registered");

    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`);
    });
  } catch (err) {
    console.error("❌ UNCAUGHT STARTUP ERROR:", err);
    process.exit(1);
  }
})();


