import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Filter, Trash2 } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { useAuthStore } from '../store/useAuthStore';

const CATEGORIES = ['all', 'clothing', 'accessories'];

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { products, removeProduct } = useProductStore();
  const { user } = useAuthStore();

  const filteredProducts = products.filter(
    product => selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="mb-8 flex space-x-4">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            {user?.isAdmin && (
              <button
                onClick={() => removeProduct(product.id)}
                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};