import express from 'express';
import { getAllReports, updateReportStatus, getReportStats, checkAdmin } from '../controllers/admin.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(checkAdmin);

// Admin routes
router.get('/reports', getAllReports);
router.put('/reports/:id/status', updateReportStatus);
router.get('/reports/stats', getReportStats);

export default router;

