import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useProductStore } from '../store/useProductStore';
import { clsx } from 'clsx';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { getProduct } = useProductStore();
  const product = id ? getProduct(id) : undefined;
  
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={clsx(
                  'border-2 rounded-lg overflow-hidden',
                  currentImageIndex === index ? 'border-black' : 'border-transparent'
                )}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">${product.price}</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    'border rounded-md py-2 text-sm font-medium',
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700"
            >
              Buy Now
            </button>

            <button
              onClick={toggleWishlist}
              className={clsx(
                'w-full flex items-center justify-center space-x-2 border rounded-md px-6 py-3',
                inWishlist
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              )}
            >
              <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
              <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};