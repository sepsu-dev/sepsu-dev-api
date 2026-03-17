import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { decrypt } from '../../utils/encryption';
import { registerSchema, loginSchema } from './auth.validation';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const body = req.body as any;
      if (!body || !body.data) {
        return sendErrorResponse(res, 'Encrypted data is required in the "data" field', 400);
      }

      const userData = decrypt(body.data);
      
      // Validate input
      const validation = registerSchema.safeParse(userData);
      if (!validation.success) {
        const errorMessage = validation.error.errors.map((err: any) => err.message).join(', ');
        return sendErrorResponse(res, errorMessage, 400);
      }

      const result = await AuthService.register(userData);
      sendSuccessResponse(res, result, 'User registered successfully', 201);
    } catch (error: any) {
      sendErrorResponse(res, error.message, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const body = req.body as any;
      if (!body || !body.data) {
        return sendErrorResponse(res, 'Encrypted data is required in the "data" field', 400);
      }

      const credentials = decrypt(body.data);
      
      // Validate input
      const validation = loginSchema.safeParse(credentials);
      if (!validation.success) {
        const errorMessage = validation.error.errors.map((err: any) => err.message).join(', ');
        return sendErrorResponse(res, errorMessage, 400);
      }

      const result = await AuthService.login(credentials);
      sendSuccessResponse(res, result, 'Login successful');
    } catch (error: any) {
      sendErrorResponse(res, error.message, 401);
    }
  }
}