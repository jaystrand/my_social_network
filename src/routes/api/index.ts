import { Router } from 'express';
import { thoughtsRouter } from './thoughtsRoutes.ts';
import { UsersRouter } from './usersRoutes.ts';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', UsersRouter);

export default router;
