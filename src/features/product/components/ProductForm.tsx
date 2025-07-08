import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';

import {
  createNewProduct,
  editProduct,
  getProductById,
  clearSelectedProduct
} from '../productSlice';

import type { Product, ProductImage } from '../productTypes';
import ImageUploader from '../../../pages/ImageUploader';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading } = useAppSelector((state) => state.product);

  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    images: []
  });

  const [formError, setFormError] = useState('');

  // 🧲 Fetch product if editing
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getProductById(id));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, isEditMode]);

  // 🧲 Populate form state when product is fetched
  useEffect(() => {
    if (isEditMode && selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        discount: selectedProduct.discount,
        stock: selectedProduct.stock,
        category: selectedProduct.category,
        images: selectedProduct.images || []
      });
    }
  }, [selectedProduct, isEditMode]);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ['price', 'discount', 'stock'].includes(name) ? Number(value) : value
    }));
  };

  // ✅ Handle image upload from child ImageUploader
  const handleImageUpload = (image: ProductImage) => {
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), image]
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const { name, description, price, stock, category } = form;

    if (!name || !description || !price || !stock || !category) {
      setFormError('Please fill all required fields.');
      return;
    }

    try {
      if (isEditMode && id) {
        await dispatch(editProduct({ id, payload: form })).unwrap();
      } else {
        await dispatch(createNewProduct(form)).unwrap();
      }
      navigate('/seller/products/mine');
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/seller/products/mine');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </h2>

      {formError && <p className="text-red-600 mb-4">{formError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full border p-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full border p-2 rounded"
        />

        {/* Discount */}
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="w-full border p-2 rounded"
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full border p-2 rounded"
        />

        {/* Category */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Upload Product Images</label>
          <ImageUploader
            onUpload={handleImageUpload}
            multiple
            initialImages={form.images || []}
          />
        </div>

        {/* Preview uploaded images */}
        {form.images && form.images.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-2">
            {form.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`uploaded-${i}`}
                className="w-20 h-20 object-cover border rounded"
              />
            ))}
          </div>
        )}

        {/* Submit & Cancel */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
