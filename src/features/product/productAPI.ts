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

export const createProduct = async (data: Partial<Product>) => {
  const res = await API.post('/api/products', data);
  return res.data.product;
};

export const updateProduct = async ({ id, payload }: { id: string; payload: Partial<Product> }) => {
  const res = await API.put(`/api/products/${id}`, payload);
  return res.data.product;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete(`/api/products/${id}`);
  return res.data;
};

// ✅ Bulk Upload Products
export const bulkUploadProducts = async (file: File): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await API.post('/api/products/bulk-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
