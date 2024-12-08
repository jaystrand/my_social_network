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

// /api/courses/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

export { router as thoughtRouter };
