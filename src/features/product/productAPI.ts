import API from '../../services/axios';
import type { Product } from './productTypes';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await API.get('/api/products');
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await API.get(`/api/products/${id}`);
  return res.data;
};

export const fetchMyProducts = async (): Promise<Product[]> => {
  const res = await API.get('/api/products/seller/me');
  return res.data;
};

// productAPI.ts
export const createProduct = async (data: Partial<Product>) => {
  const res = await API.post('/api/products', data); // form.images must be filled
  return res.data.product;
};

export const updateProduct = async ({ id, payload }: { id: string; payload: Partial<Product> }) => {
  const res = await API.put(`/api/products/${id}`, payload); // same here
  return res.data.product;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete(`/api/products/${id}`);
  return res.data;
};
