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

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, isEditMode]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['price', 'discount', 'stock'].includes(name) ? Number(value) : value
    }));
  };

  const handleImageUpload = (image: ProductImage) => {
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), image]
    }));
  };

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
    } catch {
      setFormError('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/seller/products/mine');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h2>

        {formError && <p className="text-red-600 mb-4">{formError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Product category"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="0"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter product description"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Product Images
            </label>
            <ImageUploader
              onUpload={handleImageUpload}
              multiple
              initialImages={form.images || []}
            />
          </div>

          {/* Preview */}
          {form.images?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {form.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`uploaded-${i}`}
                  className="w-24 h-24 object-cover border rounded-md shadow-sm"
                />
              ))}
            </div>
          )}

          {/* Submit + Cancel */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
