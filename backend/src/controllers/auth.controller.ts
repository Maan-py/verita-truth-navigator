import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { createError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Helper function to generate JWT token
const generateToken = (userId: string, email: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ id: userId, email }, jwtSecret, { expiresIn: '7d' });
};

// Register new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate input
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    // If user exists (not a query error, but user found)
    if (existingUser) {
      return next(createError('User with this email already exists', 409));
    }

    // If there's a database error (not just "not found")
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Supabase check error:', checkError);
      return next(createError('Database error', 500));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .select('id, name, email, role, created_at')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return next(createError('Failed to create user', 500));
    }

    if (!newUser) {
      return next(createError('Failed to create user', 500));
    }

    // Generate token
    const token = generateToken(newUser.id, newUser.email);

    // Return user data (without password)
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role || 'user',
        },
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(createError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate input
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user in Supabase
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, name, email, password, role')
      .eq('email', email)
      .single();

    if (findError || !user) {
      return next(createError('Invalid email or password', 401));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError('Invalid email or password', 401));
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
        },
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(createError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get user profile (protected route)
export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    // Find user in Supabase
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', req.user.id)
      .single();

    if (findError || !user) {
      return next(createError('User not found', 404));
    }

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          createdAt: user.created_at,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

