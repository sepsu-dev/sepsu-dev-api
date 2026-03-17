import { Router } from 'express';
import { TestController } from './test.controller';

const router = Router();

router.post('/encrypt', TestController.encrypt);
router.post('/decrypt', TestController.decrypt);

export default router;