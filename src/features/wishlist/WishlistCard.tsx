// src/features/wishlist/components/WishlistCard.tsx

import type { WishlistItem } from './wishlistTypes';
import { useAppDispatch } from './../../hooks/useReduxTypedHooks';
import { removeWishlistItem } from './wishlistSlice';

export default function WishlistCard({ item }: { item: WishlistItem }) {
  const dispatch = useAppDispatch();

  const imageUrl = item.images[0]?.url || '/placeholder.jpg'; // fallback image

  return (
    <div className="border p-4 rounded shadow-sm flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-500">₹{item.price}</p>
        </div>
      </div>
      <button
        onClick={() => dispatch(removeWishlistItem(item._id))}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
