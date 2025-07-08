import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../productSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import ProductActionBar from './ProductActionBar';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.product);
  const { role, _id } = useAppSelector((state) => state.auth.user); // assuming user info is stored here

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  if (!selectedProduct) return <p>Loading product...</p>;

  const isOwner = role === 'admin' || selectedProduct.seller === _id;

  return (
    <div className="p-4">
      <img src={selectedProduct.images[0]?.url} alt={selectedProduct.name} className="w-full h-80 object-cover" />
      <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
      <p>{selectedProduct.description}</p>
      <p className="mt-2 text-xl">₹{selectedProduct.price}</p>

      {isOwner && <ProductActionBar productId={selectedProduct._id} />}
    </div>
  );
};

export default ProductDetails;
