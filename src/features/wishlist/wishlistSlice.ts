// src/features/wishlist/wishlistSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from './wishlistAPI';
import type { WishlistState } from './wishlistTypes';

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// ✅ Thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (_, thunkAPI) => {
    try {
      return await getWishlist();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addWishlistItem = createAsyncThunk(
  'wishlist/add',
  async (productId: string, thunkAPI) => {
    try {
      return await addToWishlist(productId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  'wishlist/remove',
  async (productId: string, thunkAPI) => {
    try {
      return await removeFromWishlist(productId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
