import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getProducts } from '../productSlice';
import { addWishlistItem, removeWishlistItem } from '../../wishlist/wishlistSlice';
import { addItemToCart } from '../../cart/cartSlice';
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

  const handleAddToCart = (product: any) => {
    dispatch(addItemToCart(product._id));
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => item._id === product._id);

        return (
          <div
            key={product._id}
            className="relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-all duration-300"
          >
            {/* ❤️ Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(product._id)}
              className="absolute top-3 right-3 text-xl text-red-500 z-10"
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>

            {/* 🖼️ Product Image */}
            <Link to={`/products/${product._id}`}>
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
            </Link>

            {/* 📦 Product Details */}
            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-gray-700 mt-1 font-medium">₹{product.price}</p>
              </Link>

              {/* 🛒 Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
