import express from 'express';
import { createReport, getUserReports, getReport } from '../controllers/reports.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// User routes
router.post('/', createReport);
router.get('/', getUserReports);
router.get('/:id', getReport);

export default router;

