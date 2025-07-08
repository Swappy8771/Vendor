// src/features/cart/cartAPI.ts

import API from '../../services/axios'; // preconfigured axios instance

// GET /api/cart → fetch all cart items for current user
export const getCart = async () => {
  const res = await API.get('/api/cart');
  return res.data; // expected to return array of CartItem
};

// POST /api/cart → add or update product in cart
export const addToCart = async (productId: string, quantity: number = 1) => {
  const res = await API.post('/api/cart', { productId, quantity });
  return res.data; // expected to return updated cart array
};

// DELETE /api/cart/:productId → remove product from cart
export const removeFromCart = async (productId: string) => {
  const res = await API.delete(`/api/cart/${productId}`);
  return res.data; // expected to return updated cart array
};
