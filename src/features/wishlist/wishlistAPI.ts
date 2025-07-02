// src/features/wishlist/wishlistApi.ts
import axios from 'axios';

const API_URL = '/api/wishlist';

export const getWishlist = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addToWishlist = async (productId: string) => {
  const res = await axios.post(API_URL, { productId });
  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  await axios.delete(`${API_URL}/${productId}`);
  return productId;
};
