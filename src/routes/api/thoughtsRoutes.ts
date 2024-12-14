import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  removeReactions,
} from '../../controllers/thoughtsController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtsId/reactions/:reactionsId
router.route('/:thoughtsId/reactions/:reactionsId').delete(removeReactions).post(addReactions);

export { router as thoughtsRouter };
