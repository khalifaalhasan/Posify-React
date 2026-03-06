import { create } from 'zustand';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product: Product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity: 1 }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }),

  removeItem: (productId: string) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter((item) => item.product.id !== productId);
        return {
          items: newItems,
          total: calculateTotal(newItems),
        };
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }),

  clearCart: () => set({ items: [], total: 0 }),
}));
