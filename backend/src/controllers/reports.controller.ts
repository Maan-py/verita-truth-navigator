import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

// Validation schema
const createReportSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  image_url: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
});

// Create a new report
export const createReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const validatedData = createReportSchema.parse(req.body);
    const { content, image_url, category } = validatedData;

    const { data: report, error } = await supabase
      .from('reports')
      .insert({
        user_id: req.user.id,
        content,
        image_url: image_url || null,
        category: category || null,
        status: 'PENDING',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to create report', 500));
    }

    res.status(201).json({
      status: 'success',
      message: 'Report submitted successfully',
      data: report,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(createError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get user's reports
export const getUserReports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const { data: reports, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch reports', 500));
    }

    res.json({
      status: 'success',
      data: reports || [],
    });
  } catch (error) {
    next(error);
  }
};

// Get single report by ID
export const getReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const { id } = req.params;

    const { data: report, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !report) {
      return next(createError('Report not found', 404));
    }

    // Check if user owns this report or is admin
    if (report.user_id !== req.user.id) {
      // Check if user is admin (you'll need to add this check)
      return next(createError('Unauthorized', 403));
    }

    res.json({
      status: 'success',
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

