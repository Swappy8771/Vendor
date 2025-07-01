import API from '../../services/axios';
import type { Category } from './categoryTypes';

// Get all categories
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await API.get('/api/categories');
  return res.data;
};

// Create a new category (admin)
export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  const res = await API.post('/api/categories', data);
  return res.data;
};
