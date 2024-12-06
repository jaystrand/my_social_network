import { Router } from 'express';
import { thoughtRouter } from './courseRoutes.js';
import { UserRouter } from './studentRoutes.js';
const router = Router();
router.use('/courses', thoughtRouter);
router.use('/students', UserRouter);
export default router;
