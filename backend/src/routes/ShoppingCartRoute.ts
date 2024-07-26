import express from 'express';
import User from '../models/User';

const router = express.Router();

// Add item to cart
router.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();
    res.status(200).json(user.cart);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// Update item quantity in cart
router.put('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    await user.save();
    res.status(200).json(user.cart);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/cart', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json(user.cart);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
