// src/features/wishlist/components/WishlistCard.tsx

import type { WishlistItem } from '../wishlistTypes';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';
import { removeWishlistItem } from '../wishlistSlice';

export default function WishlistCard({ item }: { item: WishlistItem }) {
  const dispatch = useAppDispatch();
  const imageUrl = item.images[0]?.url || '/placeholder.jpg';

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between transition hover:shadow-lg">
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => dispatch(removeWishlistItem(item._id))}
        className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Remove
      </button>
    </div>
  );
}
