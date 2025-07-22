// src/features/wishlist/WishlistPage.tsx

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { fetchWishlist } from '../wishlistSlice';
import WishlistCard from './WishlistCard';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Wishlist</h2>

      {/* Loading/Error/Empty States */}
      {loading && (
        <div className="text-center text-gray-500">Loading wishlist...</div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500">No items in your wishlist yet.</div>
      )}

      {/* Wishlist Items */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
