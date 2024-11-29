import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { items } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};