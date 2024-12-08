import { Router } from 'express';
import { thoughtsRouter } from './thoughtRoutes.ts';
import { usersRouter } from './userRoutes.ts';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);

export default router;
