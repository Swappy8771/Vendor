import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getProducts } from '../productSlice';
import { addWishlistItem, removeWishlistItem } from '../../wishlist/wishlistSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleWishlist = (productId: string) => {
    const isInWishlist = wishlistItems.some((item) => item._id === productId);
    if (isInWishlist) {
      dispatch(removeWishlistItem(productId));
    } else {
      dispatch(addWishlistItem(productId));
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => item._id === product._id);

        return (
          <div
            key={product._id}
            className="relative border p-4 rounded shadow hover:shadow-md transition"
          >
            {/* ❤️ Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product._id)}
              className="absolute top-2 right-2 z-10 text-xl text-red-500"
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>

            {/* 🖼️ Product Body */}
            <Link to={`/products/${product._id}`}>
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="mt-2 font-bold text-lg">{product.name}</h2>
              <p>₹{product.price}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
