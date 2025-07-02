// src/features/wishlist/WishlistPage.tsx

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxTypedHooks';
import { fetchWishlist } from './wishlistSlice';
import WishlistCard from './WishlistCard';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {loading && <p>Loading wishlist...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && items.length === 0 && <p className="text-gray-500">No items in wishlist.</p>}

      <div className="space-y-4">
        {items.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
