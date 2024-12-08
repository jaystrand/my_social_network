import { Router } from 'express';
import { thoughtsRouter } from './thoughts.js';
import { UsersRouter } from './usersRoutes.js';
const router = Router();
router.use('/thoughts', thoughtsRouter);
router.use('/users', UsersRouter);
export default router;
