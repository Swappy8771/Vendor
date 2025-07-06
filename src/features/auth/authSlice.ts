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
  registrationSuccess: boolean; // ✅ NEW FLAG
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
  registrationSuccess: false, // ✅ INITIALLY false
};

// Async login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await loginAPI(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);

// Async register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData: any, thunkAPI) => {
    try {
      const res = await registerAPI(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Register failed');
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
    },
    clearAuthState(state) {
      state.error = null;
      state.registrationSuccess = false; // ✅ RESET
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REGISTER
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true; // ✅ Only flag, no token saved
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.registrationSuccess = false;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
