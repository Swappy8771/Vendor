import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Cart, CartState } from './cartTypes';
import { getCart, addToCart, removeFromCart } from './cartAPI';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// 🔁 Thunks

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    return await getCart();
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to fetch cart');
    console.log(err)
  }
});

export const addItemToCart = createAsyncThunk(
  'cart/add',
  async (item: Cart, thunkAPI) => {
    try {
      return await addToCart(item);
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to add item to cart');
    console.log(err)
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/remove',
  async (productId: string, thunkAPI) => {
    try {
      return await removeFromCart(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to remove item from cart');
    console.log(err)

    }
  }
);

// 🧩 Slice

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📦 Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ➕ Add Item
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // ❌ Remove Item
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
