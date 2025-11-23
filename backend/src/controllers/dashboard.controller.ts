import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler.js';
import { supabase } from '../lib/supabase.js';

// Get all dashboard categories
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: categories, error } = await supabase
      .from('dashboard_data_categories')
      .select('*')
      .order('category_id');

    if (error) {
      console.error('Supabase error:', error);
      return next(createError('Failed to fetch categories', 500));
    }

    res.json({
      status: 'success',
      data: categories || [],
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard data for a specific category
export const getCategoryData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    // Get category info
    const { data: category, error: categoryError } = await supabase
      .from('dashboard_data_categories')
      .select('*')
      .eq('category_id', categoryId)
      .single();

    if (categoryError || !category) {
      return next(createError('Category not found', 404));
    }

    // Get data items for this category
    const { data: items, error: itemsError } = await supabase
      .from('dashboard_data_items')
      .select('*')
      .eq('category_id', category.id)
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error('Supabase error:', itemsError);
      return next(createError('Failed to fetch category data', 500));
    }

    res.json({
      status: 'success',
      data: {
        category,
        items: items || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create or update dashboard data item
export const upsertDataItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { label, value, trend, source_url } = req.body;

    if (!label || !value) {
      return next(createError('Label and value are required', 400));
    }

    // Get category
    const { data: category, error: categoryError } = await supabase
      .from('dashboard_data_categories')
      .select('id')
      .eq('category_id', categoryId)
      .single();

    if (categoryError || !category) {
      return next(createError('Category not found', 404));
    }

    // Upsert data item
    const { data: item, error: upsertError } = await supabase
      .from('dashboard_data_items')
      .upsert({
        category_id: category.id,
        label,
        value,
        trend,
        source_url,
        last_updated: new Date().toISOString(),
      }, {
        onConflict: 'id',
      })
      .select()
      .single();

    if (upsertError) {
      console.error('Supabase error:', upsertError);
      return next(createError('Failed to save data item', 500));
    }

    res.json({
      status: 'success',
      message: 'Data item saved successfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

