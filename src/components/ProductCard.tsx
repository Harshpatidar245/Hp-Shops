import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity"
          />
          <button
            onClick={handleWishlistClick}
            className={clsx(
              "absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition-colors duration-200",
              inWishlist ? "text-red-500 hover:text-red-700" : "text-gray-600 hover:text-red-500"
            )}
          >
            <Heart className="w-6 h-6" fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-1">${product.price}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="mt-4 w-full flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
};