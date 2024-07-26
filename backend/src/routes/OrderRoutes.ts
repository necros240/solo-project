import express from 'express';
import { protect, employee } from '../middlewares/authMiddleware';
import { getOrders, getOrderById } from '../controllers/orderController';

const router = express.Router();

router.route('/').get(protect, employee, getOrders);
router.route('/:id').get(protect, employee, getOrderById);

export default router;
