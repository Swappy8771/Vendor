import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';
import { removeProduct } from '../productSlice';
import { PencilLine, Trash2 } from 'lucide-react'; // You can replace with any icon set

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
    <div className="mt-6 flex justify-end gap-4">
      <button
        onClick={() => navigate(`/seller/products/edit/${productId}`)}
        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm transition"
      >
        <PencilLine size={16} />
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
};

export default ProductActionBar;
