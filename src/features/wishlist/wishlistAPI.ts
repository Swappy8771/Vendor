// src/features/wishlist/wishlistApi.ts
import API from '../../services/axios'; // ✅ Use the custom Axios instance

const API_URL = '/api/wishlist';

export const getWishlist = async () => {
  const res = await API.get(API_URL); // ✅ Use `API` instead of `axios`
  return res.data;
};

export const addToWishlist = async (productId: string) => {
  const res = await API.post(API_URL, { productId }); // ✅ token included via interceptor
  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  await API.delete(`${API_URL}/${productId}`); // ✅ same here
  return productId;
};
