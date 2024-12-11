import { Router } from 'express';
const router = Router();
import { getAllUsers, getUsersById, createUsers, deleteUsers, addAssignment, removeAssignment, } from '../../controllers/usersController.js';
// /api/Users
router.route('/').get(getAllUsers).post(createUsers);
// /api/Users/:UsersId
router.route('/:UsersId').get(getUsersById).delete(deleteUsers);
// /api/Users/:UsersId/assignments
router.route('/:UsersId/assignments').post(addAssignment);
// /api/users/:usersId/assignments/:assignmentId
router.route('/:UsersId/assignments/:assignmentId').delete(removeAssignment);
export { router as usersRouter };
