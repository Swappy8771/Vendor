// src/features/product/components/MyProducts.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getMyProducts, removeProduct } from '../productSlice';
import { Link, useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await dispatch(removeProduct(id));
      dispatch(getMyProducts()); // 🔁 refresh product list
    }
  };

 

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Products</h2>
        <div className="space-x-2">
          <Link
            to="/seller/products/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Product
          </Link>
         
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              src={product.images?.[0]?.url || '/placeholder.png'}
              alt={product.name}
              className="h-40 w-full object-cover mb-2"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm line-clamp-2">{product.description}</p>
            <p className="text-sm font-bold mt-2">₹{product.price}</p>

            <div className="flex justify-between mt-4 text-sm">
              <Link
                to={`/seller/products/edit/${product._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
