import { Router } from 'express';
<<<<<<< HEAD
import { thoughtsRouter } from './thoughtsRoutes.js';
=======
import { thoughtsRouter } from './thoughtsRouter.js';
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
import { UsersRouter } from './usersRoutes.js';
const router = Router();
router.use('/thoughts', thoughtsRouter);
router.use('/users', UsersRouter);
export default router;
