// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from './authAPI';

interface User {
  avatar: string;
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  registrationSuccess: boolean;
}

// 🔁 Load user/token from localStorage if available
const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
  isAuthenticated: !!tokenFromStorage,
  registrationSuccess: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await loginAPI(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData: any, thunkAPI) => {
    try {
      const res = await registerAPI(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearAuthState(state) {
      state.error = null;
      state.registrationSuccess = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // 🧠 Persist data
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
