import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            StyleStore
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            
            {user?.isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            )}
            
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900">
              <Heart className="w-6 h-6" />
            </Link>

            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};