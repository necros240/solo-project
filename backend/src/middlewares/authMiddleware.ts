import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById((decoded as any).id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const manager = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'Manager') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a manager');
  }
};

const employee = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'Employee') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an employee');
  }
};

export { protect, admin, manager, employee };
