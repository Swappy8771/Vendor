import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { addWishlistItem, removeWishlistItem } from '../wishlistSlice';

interface Props {
  productId: string;
}

export default function WishlistButton({ productId }: Props) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items) || [];

  const isInWishlist = wishlistItems.some((item) => item._id === productId);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeWishlistItem(productId));
    } else {
      dispatch(addWishlistItem(productId));
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="absolute top-2 right-2 z-10 text-xl text-red-500"
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
