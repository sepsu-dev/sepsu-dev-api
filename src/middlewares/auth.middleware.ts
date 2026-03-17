import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from './error.middleware';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check for JWT Bearer Token Authentication
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error: AppError = new Error('Unauthorized: Missing bearer token');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    return next();
  } catch (err) {
    const error: AppError = new Error('Invalid or expired token');
    error.statusCode = 401;
    return next(error);
  }
};
