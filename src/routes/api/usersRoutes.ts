import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUsersById,
  createUsers,
  deleteUsers,
  addFriends,
  removeFriends,
} from '../../controllers/usersController.js';

// /api/Users
router.route('/').get(getAllUsers).post(createUsers);

// /api/Users/:UsersId
router.route('/:usersId').get(getUsersById).delete(deleteUsers);

// /api/users/:usersId/friends/:friendsId
router.route('/:usersId/friends/:friendsId').delete(removeFriends).post(addFriends);

export { router as usersRouter} ;
