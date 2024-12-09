import { Router } from 'express';
import { thoughtsRouter } from './thoughtsRoutes.js';
import { UsersRouter } from './usersRoutes.js';
const router = Router();
router.use('/thoughts', thoughtsRouter);
router.use('/users', UsersRouter);
export default router;
