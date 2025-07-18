// src/features/admin/adminAPI.ts
import API from '../../services/axios';
import type { User } from '../user/userTypes';
import type { AdminOrder, AdminSeller, AdminStats } from './adminType';

interface GetUsersResponse {
  users: User[];
}

export const getAdminOverview = async (): Promise<AdminStats> => {
  const res = await API.get('/api/admin/overview');
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await API.get<GetUsersResponse>('/api/admin/users');
  if (!Array.isArray(res.data.users)) {
    throw new Error('Invalid response format: expected users array');
  }
  return res.data.users;
};

export const getAllSellers = async (): Promise<AdminSeller[]> => {
  const res = await API.get('/api/admin/sellers');
  if (res.data?.success && Array.isArray(res.data.sellers)) {
    return res.data.sellers;
  }
  throw new Error('Invalid response format while fetching sellers');
};

export const getAllOrders = async (): Promise<AdminOrder[]> => {
  const res = await API.get('/api/admin/orders');
  return res.data;
};

export const verifySeller = async (sellerId: string): Promise<AdminSeller> => {
  const res = await API.put(`/api/admin/sellers/${sellerId}/verify`);
  if (res.data?.success && res.data.seller) {
    return res.data.seller;
  }
  throw new Error('Failed to verify seller');
};
