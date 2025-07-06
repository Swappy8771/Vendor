// src/features/reviews/reviewAPI.ts

import axios from 'axios';
import type { NewReview } from './reviewTypes';

export const fetchReviewsByProduct = async (productId: string) => {
  const res = await axios.get(`/api/reviews/${productId}`);
  return res.data;
};

export const submitReview = async (data: NewReview) => {
  const res = await axios.post(`/api/reviews/${data.productId}`, {
    rating: data.rating,
    comment: data.comment,
  });
  return res.data;
};
