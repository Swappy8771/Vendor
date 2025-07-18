import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';import {
  getAdminOverview,
  getAllUsers,
  getAllSellers,
  getAllOrders,
  verifySeller,
} from './adminAPI';
import type { AdminState, AdminStats, AdminUser, AdminSeller, AdminOrder } from './adminType';

// ✅ Initial state
const initialState: AdminState = {
  stats: null,
  users: [],
  sellers: [],
  orders: [],
  loading: false,
  error: null,
};

// ✅ Async Thunks
export const fetchOverview = createAsyncThunk<AdminStats>('admin/fetchOverview', getAdminOverview);
export const fetchUsers = createAsyncThunk<AdminUser[]>('admin/fetchUsers', getAllUsers);
export const fetchSellers = createAsyncThunk<AdminSeller[]>('admin/fetchSellers', getAllSellers);
export const fetchOrders = createAsyncThunk<AdminOrder[]>('admin/fetchOrders', getAllOrders);
export const verifySellerById = createAsyncThunk<AdminSeller, string>(
  'admin/verifySeller',
  verifySeller
);

// ✅ Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError(state) {
      state.error = null;
    },
    setUsers(state, action: PayloadAction<AdminUser[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📊 Overview
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch overview';
      })

      // 👤 Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // 🛍️ Sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sellers';
      })

      // 📦 Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })

      // ✅ Verify Seller
      .addCase(verifySellerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySellerById.fulfilled, (state, action) => {
        const index = state.sellers.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(verifySellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to verify seller';
      });
  },
});

// ✅ Exports
export const { clearAdminError, setUsers, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer;
