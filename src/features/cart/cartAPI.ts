import API from '../../services/axios';
import type { Cart } from './cartTypes';

// ✅ Get Cart Items
export const getCart = async (): Promise<Cart[]> => {
  const res = await API.get('/api/cart');
  return res.data;
};

// ✅ Add Item to Cart
export const addToCart = async (item: Cart): Promise<Cart[]> => {
  const res = await API.post('/api/cart', item);
  return res.data;
};

// ✅ Remove Item from Cart (based on productId)
export const removeFromCart = async (productId: string): Promise<Cart[]> => {
  const res = await API.delete(`/api/cart/${productId}`);
  return res.data;
};
