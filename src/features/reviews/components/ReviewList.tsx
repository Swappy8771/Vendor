// src/features/reviews/components/ReviewList.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getReviews } from '../reviewSlice'; // ✅ corrected import

type Props = {
  productId: string;
};

export default function ReviewList({ productId }: Props) {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews(productId));
  }, [dispatch, productId]);

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="p-4 border rounded bg-gray-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">{review.user?.name || 'Anonymous'}</p>
            <span className="text-yellow-500 font-semibold">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
          </div>
          <p className="text-gray-700 text-sm">{review.comment}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
