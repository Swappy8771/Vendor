import API from '../../services/axios';
import type { Product } from './productTypes';

// 📦 GET all products
export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await API.get('/api/products');
  return res.data;
};

// 🔍 GET single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await API.get(`/api/products/${id}`);
  return res.data;
};

// ➕ POST new product
export const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const res = await API.post('/api/products', product);
  return res.data;
};

// 📝 PUT update product
export const updateProduct = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<Product>;
}): Promise<Product> => {
  const res = await API.put(`/api/products/${id}`, payload);
  return res.data;
};

// ❌ DELETE product
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete(`/api/products/${id}`);
  return res.data;
};
