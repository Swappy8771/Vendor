import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
} from './userAPI';

import type { User, Address } from './userTypes';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

// 📌 Thunks

export const getUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
  try {
    return await fetchUserProfile();
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch user');
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (payload: Partial<User>, thunkAPI) => {
    try {
      return await updateUserProfile(payload);
    } catch {
      return thunkAPI.rejectWithValue('Profile update failed');
    }
  }
);

export const addAddress = createAsyncThunk(
  'user/addAddress',
  async (address: Address, thunkAPI) => {
    try {
      return await addUserAddress(address);
    } catch {
      return thunkAPI.rejectWithValue('Add address failed');
    }
  }
);

export const editAddress = createAsyncThunk(
  'user/editAddress',
  async ({ id, address }: { id: string; address: Address }, thunkAPI) => {
    try {
      return await updateUserAddress({ id, address });
    } catch {
      return thunkAPI.rejectWithValue('Edit address failed');
    }
  }
);

export const removeAddress = createAsyncThunk(
  'user/removeAddress',
  async (id: string, thunkAPI) => {
    try {
      return await deleteUserAddress(id);
    } catch {
      return thunkAPI.rejectWithValue('Remove address failed');
    }
  }
);

// 📦 Slice

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
