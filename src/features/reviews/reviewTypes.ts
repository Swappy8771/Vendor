// src/features/reviews/reviewTypes.ts

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface NewReview {
  productId: string;
  rating: number;
  comment: string;
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}
