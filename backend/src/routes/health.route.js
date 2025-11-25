import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Health check endpoint
router.get("/", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const databaseStatus = dbState === 1 ? "connected" : "disconnected";

    return res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: databaseStatus,
      environment: process.env.NODE_ENV || "development"
    });
  } catch (error) {
    return res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

export default router;
