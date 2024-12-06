import { Router } from 'express';
const router = Router();
import {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

// /api/courses
router.route('/').get(getAllThought).post(createThought);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

export { router as courseRouter };
