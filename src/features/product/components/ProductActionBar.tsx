import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';
import { removeProduct } from '../productSlice';

interface Props {
  productId: string;
}

const ProductActionBar: React.FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (confirm) {
      await dispatch(removeProduct(productId));
      navigate('/seller/products');
    }
  };

  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={() => navigate(`/seller/products/edit/${productId}`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductActionBar;
