import { Router } from 'express';
<<<<<<< HEAD
import { thoughtsRouter } from './thoughtsRoutes.ts';
import { UsersRouter } from './usersRoutes.ts';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', UsersRouter);
=======
import { thoughtRouter } from './thoughtRoutes.ts';
import { UserRouter } from './userRoutes.ts';

const router = Router();

router.use('/thought', thoughtRouter);
router.use('/user', UserRouter);
>>>>>>> main

export default router;
