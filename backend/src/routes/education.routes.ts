import express from "express";
import { getModules, getModule, getUserProgress, updateProgress, getUserAchievements } from "../controllers/education.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/modules", getModules);
router.get("/modules/:id", getModule);

// Protected routes
router.get("/progress", authenticateToken, getUserProgress);
router.put("/modules/:moduleId/progress", authenticateToken, updateProgress);
router.get("/achievements", authenticateToken, getUserAchievements);

export default router;
