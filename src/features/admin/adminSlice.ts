import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
  import API from '../../services/axios';

// =======================
// ✅ Types
// =======================
export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
};

export type AdminSeller = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
};

export type AdminOrder = {
  _id: string;
  user: string;
  totalAmount: number;
  status: string;
};

export type AdminStats = {
  users: number;
  sellers: number;
  orders: number;
  revenue: number;
};

interface AdminState {
  loading: boolean;
  users: AdminUser[];
  sellers: AdminSeller[];
  orders: AdminOrder[];
  stats: AdminStats | null;
  error: string | null;
}

const initialState: AdminState = {
  loading: false,
  users: [],
  sellers: [],
  orders: [],
  stats: null,
  error: null,
};

// =======================
// ✅ Async Thunks
// =======================

export const fetchOverview = createAsyncThunk<
  AdminStats,
  void,
  { rejectValue: string }
>('admin/fetchOverview', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/admin/overview');
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message || 'Failed to fetch overview');
  }
});

export const fetchUsers = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/admin/users');
    const data = Array.isArray(res.data) ? res.data : res.data.users;
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message || 'Failed to fetch users');
  }
});

export const fetchSellers = createAsyncThunk<
  AdminSeller[],
  void,
  { rejectValue: string }
>('admin/fetchSellers', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/admin/sellers');
    const data = Array.isArray(res.data) ? res.data : res.data.sellers;
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message || 'Failed to fetch sellers');
  }
});

export const fetchOrders = createAsyncThunk<
  AdminOrder[],
  void,
  { rejectValue: string }
>('admin/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/admin/orders');
    return res.data.orders || [];
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message || 'Failed to fetch orders');
  }
});

export const verifySellerById = createAsyncThunk<
  AdminSeller,
  string,
  { rejectValue: string }
>('admin/verifySeller', async (sellerId, { rejectWithValue }) => {
  try {
    const res = await API.patch(`/api/admin/verify-seller/${sellerId}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message || 'Failed to verify seller');
  }
});

// =======================
// ✅ Slice
// =======================

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 📊 Overview
      .addCase(fetchOverview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action: PayloadAction<AdminStats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch overview';
      })

      // 👥 Users
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<AdminUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })

      // 🏪 Sellers
      .addCase(fetchSellers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action: PayloadAction<AdminSeller[]>) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sellers';
      })

      // 📦 Orders
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<AdminOrder[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })

      // ✅ Seller Verification
      .addCase(verifySellerById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySellerById.fulfilled, (state, action: PayloadAction<AdminSeller>) => {
        state.loading = false;
        // update the verified seller in the list
        state.sellers = state.sellers.map(seller =>
          seller._id === action.payload._id ? action.payload : seller
        );
      })
      .addCase(verifySellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to verify seller';
      });
  },
});

export default adminSlice.reducer;
