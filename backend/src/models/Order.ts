import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  orderItems: {
    productId: Schema.Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true,
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
