import API from '../../services/axios';
import type { User } from './userTypes';
import type { Address } from './userTypes';

// Fetch current user profile (via token)
export const fetchUserProfile = async (): Promise<User> => {
  const res = await API.get('/api/auth/me');
  return res.data;
};

// Update user profile (name, phone, etc.)
export const updateUserProfile = async (payload: Partial<User>): Promise<User> => {
  const res = await API.put('/api/users/update-profile', payload);
  return res.data;
};

// Add a new address
export const addUserAddress = async (address: Address): Promise<User> => {
  const res = await API.post('/api/users/addresses', address);
  return res.data;
};

// Update address by ID
export const updateUserAddress = async ({
  id,
  address,
}: {
  id: string;
  address: Address;
}): Promise<User> => {
  const res = await API.put(`/api/users/addresses/${id}`, address);
  return res.data;
};

// Delete address by ID
export const deleteUserAddress = async (id: string): Promise<User> => {
  const res = await API.delete(`/api/users/addresses/${id}`);
  return res.data;
};
