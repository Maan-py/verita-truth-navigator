import express from "express";
import { getCategories, getCategoryData, upsertDataItem } from "../controllers/dashboard.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

// Public routes
router.get("/categories", getCategories);
router.get("/categories/:categoryId", getCategoryData);

// Admin routes (for managing dashboard data)
router.post("/categories/:categoryId/items", authenticateToken, checkAdmin, upsertDataItem);

export default router;
