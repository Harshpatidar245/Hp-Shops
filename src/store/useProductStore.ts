import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  getProduct: (productId: string) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  addProduct: (product) => 
    set((state) => ({
      products: [...state.products, { ...product, id: crypto.randomUUID() }]
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId)
    })),
  getProduct: (productId) => get().products.find((product) => product.id === productId)
}));