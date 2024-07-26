import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Order } from './types';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get<Order[]>('/api/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id} - Total Price: {order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
