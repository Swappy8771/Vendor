import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../../cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';

const AddToCart = () => {
  const dispatch = useAppDispatch();
  const { items: cartItems, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-3 rounded shadow-sm"
          >
            <img
              src={item.product?.images?.[0]?.url}
              alt={item.product?.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <Link to={`/products/${item.product._id}`}>
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
              </Link>
              <p className="text-gray-600">Price: ₹{item.product.price}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
              <p className="text-sm text-gray-500">
                In Stock: {item.product.stock}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCart;
