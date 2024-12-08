import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes.js';
import { UserRouter } from './userRoutes.js';
const router = Router();
router.use('/courses', thoughtRouter);
router.use('/students', UserRouter);
export default router;
