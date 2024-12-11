import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtsById, createThoughts, updateThoughts, deleteThoughts, } from '../../controllers/thoughtsController.js';
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThoughts);
// /api/thoughts/:thoughtId
router
    .route('/:thoughtsId')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);
export { router as thoughtsRouter };
