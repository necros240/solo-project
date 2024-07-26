import mongoose, { Document, Schema } from 'mongoose';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
