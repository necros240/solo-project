import express,{Request,Response} from 'express';
import Product from '../models/Product';
import { protect, employee } from '../middlewares/authMiddleware';

const router = express.Router();

// Get products with search and filter


export default router;
