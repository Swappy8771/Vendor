import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  placeOrder,
  fetchUserOrders,
  fetchOrderById,
  updateOrderStatus
} from './orderAPI';
import type { Order } from './orderTypes';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

// Thunks
export const createOrder = createAsyncThunk('order/create', async (order: Partial<Order>, thunkAPI) => {
  try {
    return await placeOrder(order);
  } catch {
    return thunkAPI.rejectWithValue('Failed to place order');
  }
});

export const getMyOrders = createAsyncThunk('order/getMy', async (_, thunkAPI) => {
  try {
    return await fetchUserOrders();
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch orders');
  }
});

export const getOrderDetails = createAsyncThunk('order/getOne', async (id: string, thunkAPI) => {
  try {
    return await fetchOrderById(id);
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch order details');
  }
});

export const changeOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      return await updateOrderStatus({ id, status });
    } catch {
      return thunkAPI.rejectWithValue('Failed to update status');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  }
});

export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
