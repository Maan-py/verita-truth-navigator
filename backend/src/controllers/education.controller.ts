import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

// Get all education modules
export const getModules = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: modules, error } = await supabase
      .from('education_modules')
      .select('*')
      .eq('is_active', true)
      .order('order_index');

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch modules', 500));
    }

    res.json({
      status: 'success',
      data: modules || [],
    });
  } catch (error) {
    next(error);
  }
};

// Get single module by ID
export const getModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { data: module, error } = await supabase
      .from('education_modules')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !module) {
      return next(createError('Module not found', 404));
    }

    res.json({
      status: 'success',
      data: module,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's module progress
export const getUserProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const { data: progress, error } = await supabase
      .from('module_progress')
      .select('*, education_modules(*)')
      .eq('user_id', req.user.id)
      .order('started_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch progress', 500));
    }

    res.json({
      status: 'success',
      data: progress || [],
    });
  } catch (error) {
    next(error);
  }
};

// Update module progress
export const updateProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const { moduleId } = req.params;
    
    if (!moduleId || moduleId.trim() === '') {
      return next(createError('Module ID is required', 400));
    }

    const { progress_percentage, completed } = req.body;

    if (progress_percentage < 0 || progress_percentage > 100) {
      return next(createError('Progress percentage must be between 0 and 100', 400));
    }

    const updateData: any = {
      progress_percentage,
      updated_at: new Date().toISOString(),
    };

    if (completed) {
      updateData.completed = true;
      updateData.completed_at = new Date().toISOString();
    }

    const { data: progress, error } = await supabase
      .from('module_progress')
      .upsert({
        user_id: req.user.id,
        module_id: moduleId,
        ...updateData,
      }, {
        onConflict: 'user_id,module_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to update progress', 500));
    }

    res.json({
      status: 'success',
      message: 'Progress updated successfully',
      data: progress,
    });
  } catch (error) {
    next(error);
  }
};

// Get user achievements
export const getUserAchievements = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    const { data: achievements, error } = await supabase
      .from('user_achievements')
      .select('*, achievements(*)')
      .eq('user_id', req.user.id)
      .order('earned_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch achievements', 500));
    }

    res.json({
      status: 'success',
      data: achievements || [],
    });
  } catch (error) {
    next(error);
  }
};

