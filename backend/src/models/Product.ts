import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
