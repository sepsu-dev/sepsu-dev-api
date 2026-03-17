import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const prefix = '/users';

const router = Router();

router.get('/', authMiddleware, UserController.getUsers);

export default router;