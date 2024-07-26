import express, { Request, Response } from 'express';
import { protect, AuthenticatedRequest } from '../middlewares/authMiddleware';
import Cart from '../models/Cart';
import { CartItem } from '../models/Cart';

const router = express.Router();

router.get('/', protect, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const cart = await Cart.find({ user: req.user?._id });
    res.json(cart);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
