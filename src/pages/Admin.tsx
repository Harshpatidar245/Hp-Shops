import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useProductStore } from '../store/useProductStore';

export const Admin = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    images: ['', '', ''],
    sizes: [] as string[],
  });

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addProduct } = useProductStore();

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productData.images];
    newImages[index] = value;
    setProductData({ ...productData, images: newImages });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = productData.sizes.includes(size)
      ? productData.sizes.filter(s => s !== size)
      : [...productData.sizes, size];
    setProductData({ ...productData, sizes: newSizes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty image URLs
    const filteredImages = productData.images.filter(url => url.trim() !== '');
    
    if (filteredImages.length === 0) {
      alert('Please add at least one product image');
      return;
    }

    if (productData.sizes.length === 0) {
      alert('Please select at least one size');
      return;
    }

    addProduct({
      id: '', // Will be set by the store
      name: productData.name,
      price: parseFloat(productData.price),
      category: productData.category,
      description: productData.description,
      images: filteredImages,
      sizes: productData.sizes,
      inStock: true
    });

    alert('Product added successfully!');
    setProductData({
      name: '',
      price: '',
      category: '',
      description: '',
      images: ['', '', ''],
      sizes: [],
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            required
            value={productData.name}
            onChange={e => setProductData({ ...productData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            required
            value={productData.price}
            onChange={e => setProductData({ ...productData, price: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            required
            value={productData.category}
            onChange={e => setProductData({ ...productData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          >
            <option value="">Select category</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={productData.description}
            onChange={e => setProductData({ ...productData, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (URLs)</label>
          {productData.images.map((url, index) => (
            <input
              key={index}
              type="url"
              value={url}
              onChange={e => handleImageChange(index, e.target.value)}
              placeholder={`Image ${index + 1} URL`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          ))}
          <p className="mt-1 text-sm text-gray-500">At least one image URL is required</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
          <div className="grid grid-cols-5 gap-2">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`${
                  productData.sizes.includes(size)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border-gray-300'
                } border rounded-md py-2 px-4 focus:outline-none`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};