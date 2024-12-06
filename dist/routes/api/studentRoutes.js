import { Router } from 'express';
const router = Router();
import { getAllUser, getUserById, createUser, deleteUser, addAssignment, removeAssignment, } from '../../controllers/userController.js';
// /api/User
router.route('/').get(getAllUser).post(createUser);
// /api/User/:UserId
router.route('/:UserId').get(getUserById).delete(deleteUser);
// /api/User/:UserId/assignments
router.route('/:UserId/assignments').post(addAssignment);
// /api/students/:studentId/assignments/:assignmentId
router.route('/:UserId/assignments/:assignmentId').delete(removeAssignment);
export { router as UserRouter };
