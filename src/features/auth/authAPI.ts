// src/features/auth/authAPI.ts

import axios from '../../services/axios';

export const loginAPI = async (formData: { email: string; password: string }) => {
  const { data } = await axios.post('/api/auth/login', formData);
  return data;
};

export const registerAPI = async (formData: any) => {
  const { data } = await axios.post('/api/auth/register', formData);
  return data;
};
