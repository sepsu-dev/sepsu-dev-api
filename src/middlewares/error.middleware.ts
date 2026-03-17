import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${statusCode} - ${message}`);

  sendErrorResponse(res, message, statusCode);
};
