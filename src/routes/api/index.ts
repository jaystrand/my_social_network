import { Router } from 'express';
<<<<<<< HEAD
import { thoughtsRouter } from './thoughtsRoutes.ts';
import { usersRouter } from './usersRoutes.ts';
=======
import { thoughtsRouter } from './thoughtRoutes.ts';
import { usersRouter } from './userRoutes.ts';
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);

export default router;
