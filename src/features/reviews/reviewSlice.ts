// src/features/reviews/reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ReviewState, NewReview, Review } from './reviewTypes';
import {
  fetchReviewsByProduct,
  submitReview,
} from './reviewAPI';

export const getReviews = createAsyncThunk<Review[], string>(
  'reviews/fetchByProduct',
  async (productId, thunkAPI) => {
    try {
      const data = await fetchReviewsByProduct(productId);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addReview = createAsyncThunk<Review, NewReview>(
  'reviews/add',
  async (reviewData, thunkAPI) => {
    try {
      const data = await submitReview(reviewData);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getReviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addReview
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
