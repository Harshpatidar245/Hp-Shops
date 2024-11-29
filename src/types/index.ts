export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  sizes: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export interface WishlistItem extends Product {
  quantity: number;
}