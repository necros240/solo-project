import express from 'express';
import User,{IUser} from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import { Request,Response,NextFunction } from 'express';


const router = express.Router();

interface AuthenticatedRequest extends Request {
  user?: IUser ;
}

// Middleware to check if the user is an admin
const adminMiddleware = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  // Assuming req.user is populated by some authentication middleware
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Manage Users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// Manage Products
router.post('/products', adminMiddleware, async (req, res) => {
  const { name, description, price, countInStock, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, countInStock, category });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

// Manage Orders
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
