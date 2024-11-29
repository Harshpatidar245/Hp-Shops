import { create } from 'zustand';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addToWishlist: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) return state;
      return { items: [...state.items, product] };
    }),
  removeFromWishlist: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },
}));