import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CartItem } from "./types";



  

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get<CartItem[]>('/api/cart');
      setCart(data);
    };
    fetchCart();
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.productId} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
