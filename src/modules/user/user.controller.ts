import { Request, Response } from 'express';
import { UserService } from './user.service';
import { sendSuccessResponse } from '../../utils/response';

export class UserController {
  static async getUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      sendSuccessResponse(res, users, 'Users');
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}