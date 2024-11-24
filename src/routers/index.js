import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();

router.use('/users', authRouter);
router.use('/water', authRouter);

export default router;
