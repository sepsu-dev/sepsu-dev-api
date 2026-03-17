import { Request, Response } from 'express';
import { encrypt, decrypt } from '../../utils/encryption';

export class TestController {
  static async encrypt(req: Request, res: Response) {
    try {
      const payload: any = encrypt(req.body);

      res.json({ payload });
    } catch (error: any) {
      throw error;
    }
  }

  static async decrypt(req: Request, res: Response) {
    try {
      const result: any = decrypt(req.body.data);

      res.json(result);
    } catch (error: any) {
      throw error;
    }
  }
}