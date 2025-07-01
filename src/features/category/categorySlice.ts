import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, createCategory } from './categoryAPI';
import type { Category } from './categoryTypes';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
};

// Async Thunks
export const getCategories = createAsyncThunk(
  'category/getAll',
  async (_, thunkAPI) => {
    try {
      return await fetchCategories();
    } catch {
      return thunkAPI.rejectWithValue('Failed to load categories');
    }
  }
);

export const addCategory = createAsyncThunk(
  'category/create',
  async (data: Partial<Category>, thunkAPI) => {
    try {
      return await createCategory(data);
    } catch {
      return thunkAPI.rejectWithValue('Failed to create category');
    }
  }
);

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // ADD category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  }
});

export default categorySlice.reducer;
