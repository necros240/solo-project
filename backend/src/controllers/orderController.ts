import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order, { IOrder } from '../models/Order';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Employee
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Employee
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('user', 'id name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { getOrders, getOrderById };
