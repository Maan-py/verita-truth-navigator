import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

// Middleware to check if user is admin
export const checkAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    // Check if user is admin
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (error || !user || user.role !== 'admin') {
      return next(createError('Admin access required', 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Validation schema
const updateReportStatusSchema = z.object({
  status: z.enum(['PENDING', 'FACT', 'HOAX', 'UNVERIFIED']),
  verification_notes: z.string().optional(),
  category: z.string().optional(),
});

// Get all reports (admin only)
export const getAllReports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from('reports')
      .select('*, users:user_id(name, email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: reports, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch reports', 500));
    }

    res.json({
      status: 'success',
      data: reports || [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update report status (admin only)
export const updateReportStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validatedData = updateReportStatusSchema.parse(req.body);
    const { status, verification_notes, category } = validatedData;

    // Get current report
    const { data: report, error: fetchError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !report) {
      return next(createError('Report not found', 404));
    }

    // Update report
    const updateData: any = {
      status,
      verification_notes: verification_notes || null,
      verified_by: req.user!.id,
      verified_at: new Date().toISOString(),
    };

    if (category) {
      updateData.category = category;
    }

    const { data: updatedReport, error: updateError } = await supabase
      .from('reports')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Supabase error:', updateError);
      return next(createError('Failed to update report', 500));
    }

    res.json({
      status: 'success',
      message: 'Report status updated successfully',
      data: updatedReport,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(createError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get report statistics (admin only)
export const getReportStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get counts by status
    const { data: statusCounts, error: statusError } = await supabase
      .from('reports')
      .select('status');

    if (statusError) {
      return next(createError('Failed to fetch statistics', 500));
    }

    const stats = {
      total: statusCounts?.length || 0,
      pending: statusCounts?.filter((r) => r.status === 'PENDING').length || 0,
      fact: statusCounts?.filter((r) => r.status === 'FACT').length || 0,
      hoax: statusCounts?.filter((r) => r.status === 'HOAX').length || 0,
      unverified: statusCounts?.filter((r) => r.status === 'UNVERIFIED').length || 0,
    };

    res.json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

