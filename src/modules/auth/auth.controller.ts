import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { decrypt } from '../../utils/encryption';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      if (!req.body.data) {
        return sendErrorResponse(res, 'Encrypted data is required in the "data" field', 400);
      }

      const userData = decrypt(req.body.data);
      const result = await AuthService.register(userData);

      sendSuccessResponse(res, result, 'User registered successfully', 201);
    } catch (error: any) {
      sendErrorResponse(res, error.message, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      if (!req.body.data) {
        return sendErrorResponse(res, 'Encrypted data is required in the "data" field', 400);
      }

      const credentials = decrypt(req.body.data);
      const result = await AuthService.login(credentials);

      sendSuccessResponse(res, result, 'Login successful');
    } catch (error: any) {
      sendErrorResponse(res, error.message, 401);
    }
  }
}