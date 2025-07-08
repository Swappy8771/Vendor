import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllProducts,
  fetchProductById,
  fetchMyProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './productAPI';
import type { Product } from './productTypes';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null
};

// 🔁 Thunks
export const getProducts = createAsyncThunk('product/getAll', async (_, thunkAPI) => {
  try {
    return await fetchAllProducts();
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch products');
  }
});

export const getProductById = createAsyncThunk('product/getOne', async (id: string, thunkAPI) => {
  try {
    return await fetchProductById(id);
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch product');
  }
});

export const getMyProducts = createAsyncThunk('product/getMy', async (_, thunkAPI) => {
  try {
    return await fetchMyProducts();
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch your products');
  }
});

export const createNewProduct = createAsyncThunk(
  'product/create',
  async (product: Partial<Product>, thunkAPI) => {
    try {
      return await createProduct(product);
    } catch {
      return thunkAPI.rejectWithValue('Failed to create product');
    }
  }
);

export const editProduct = createAsyncThunk(
  'product/update',
  async ({ id, payload }: { id: string; payload: Partial<Product> }, thunkAPI) => {
    try {
      return await updateProduct({ id, payload });
    } catch {
      return thunkAPI.rejectWithValue('Failed to update product');
    }
  }
);

export const removeProduct = createAsyncThunk('product/delete', async (id: string, thunkAPI) => {
  try {
    return await deleteProduct(id);
  } catch {
    return thunkAPI.rejectWithValue('Failed to delete product');
  }
});

// 🧠 Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔃 All Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👤 My Products
      .addCase(getMyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔍 One Product
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      // ➕ Create
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // ✏️ Edit
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // ❌ Delete
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.meta.arg);
      });
  }
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
