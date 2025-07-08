// src/features/admin/adminAPI.ts
import API from '../../services/axios'; // ✅ Use your custom axios instance

import type { User } from '../user/userTypes';

export const getAdminOverview = async () => {
  const res = await API.get('/api/admin/overview');
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await API.get('/api/admin/users');
  console.log("🔍 Raw API response from /admin/users:", res.data);

  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.users)) return res.data.users;

  throw new Error('Invalid response format');
};

export const getAllSellers = async () => {
  const res = await API.get('/api/admin/sellers');

  if (res.data?.success && Array.isArray(res.data.sellers)) {
    return res.data.sellers;
  } else {
    throw new Error('Invalid response format while fetching sellers');
  }
};

export const getAllOrders = async () => {
  const res = await API.get('/api/admin/orders');
  return res.data;
};


export const verifySeller = async (sellerId: string): Promise<User> => {
  const res = await API.put(`/api/admin/sellers/${sellerId}/verify`);

  if (res.data?.success && res.data.seller) {
    return res.data.seller;
  } else {
    throw new Error('Failed to verify seller');
  }
};