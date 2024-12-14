import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriends,
  removeFriends,
} from '../../controllers/usersController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUsers);

// /api/users/:usersId
router.route('/:usersId')
  .get(getUsersById)
  .put(updateUsers) 
  .delete(deleteUsers);

// /api/users/:usersId/friends/:friendsId
router.route('/:usersId/friends/:friendsId')
  .delete(removeFriends)
  .post(addFriends);

export { router as usersRouter };

