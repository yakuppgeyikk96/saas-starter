// Auth validators - Zod schemas and Express validation middleware
import { z } from 'zod';
import { validate } from '../utils/validation';

// Zod schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Validation middlewares
export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
