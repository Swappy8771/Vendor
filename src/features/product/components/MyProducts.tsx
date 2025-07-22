import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getMyProducts, removeProduct } from '../productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

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
      dispatch(getMyProducts());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Products</h2>
        <Link
          to="/seller/products/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + Add Product
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-blue-600">Loading...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 font-medium bg-red-100 border border-red-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">You haven’t added any products yet.</p>
          <Link
            to="/seller/products/create"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Click here to add your first product.
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.images?.[0]?.url || '/placeholder.png'}
              alt={product.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base font-bold text-gray-900 mt-2">
                ₹{product.price}
              </p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/seller/products/edit/${product._id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
