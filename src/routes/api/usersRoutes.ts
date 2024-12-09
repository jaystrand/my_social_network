import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUsersById,
  createUsers,
  deleteUsers,
  addAssignment,
  removeAssignment,
} from '../../controllers/usersController.js';

// /api/Users
router.route('/').get(getAllUsers).post(createUsers);

// /api/Users/:UsersId
router.route('/:UsersId').get(getUsersById).delete(deleteUsers);

// /api/Users/:UsersId/assignments
router.route('/:UsersId/assignments').post(addAssignment);

// /api/users/:usersId/assignments/:assignmentId
router.route('/:UsersId/assignments/:assignmentId').delete(removeAssignment);

<<<<<<< HEAD
export { router as usersRouter} ;
=======
export { router as UsersRouter} ;
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
