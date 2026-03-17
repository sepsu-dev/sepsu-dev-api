import { Response } from 'express';
import { encrypt } from './encryption';

export const sendSuccessResponse = (
  res: Response,
  data: any,
  message: string = 'Success',
  statusCode: number = 200
) => {
  const payload = {
    message,
    data,
    timestamp: new Date().toISOString()
  };

  const encryptedPayload = encrypt(payload);

  return res.status(statusCode).json({
    success: true,
    payload: encryptedPayload
  });
};

export const sendErrorResponse = (res: Response, message: string, statusCode: number = 500) => {
  const payload = {
    message,
    data: null,
    timestamp: new Date().toISOString()
  };

  const encryptedPayload = encrypt(payload);

  return res.status(statusCode).json({
    success: false,
    payload: encryptedPayload
  });
};