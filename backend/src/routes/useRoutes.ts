import express from 'express';
import { authUser, registerUser, updateUserRole, getUsers } from '../controllers/userController';
import { protect, manager } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.post('/', registerUser);
router.put('/:id/role', protect, manager, updateUserRole);
router.get('/', protect, manager, getUsers);

export default router;
