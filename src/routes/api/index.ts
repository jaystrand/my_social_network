import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes.ts';
import { UserRouter } from './userRoutes.ts';

const router = Router();

router.use('/thought', thoughtRouter);
router.use('/user', UserRouter);

export default router;
