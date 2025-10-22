// src/app/(bookstore)/stores/useCartStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book } from '@/types/book';
import { toast } from 'sonner';

// Types for items in the cart and cart summary
export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

// Managing the shopping cart.
// Persists cart data in localStorage and provides actions for adding, removing, updating items, and calculating totals.
export interface CartState {
  items: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clear: () => void;
  isInCart: (bookId: string) => boolean;
  getQuantity: (bookId: string) => number;
  getSummary: () => CartSummary;
}

const CART_KEY = 'digital-bookstore:cart';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],

      // Add a book to the cart with optional quantity
      addToCart: (book, quantity = 1) => {
        const { items } = get();
        const exists = items.find((i) => i.book.id === book.id);

        if (exists) {
          toast.info(`"${book.title}" is already in your cart`);
          return;
        }

        set({ items: [...items, { book, quantity }] });
        toast.success(`"${book.title}" added to cart`);
      },

      // Remove a book from the cart by its ID
      removeFromCart: (bookId) => {
        set((state) => ({
          items: state.items.filter((i) => i.book.id !== bookId),
        }));
      },

      // Update the quantity of a cart item
      updateQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.book.id === bookId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },

      // Clear all items from the cart
      clear: () => {
        set({ items: [] });
      },

      // Helper: check if a book is already in the cart
      isInCart: (bookId) => get().items.some((i) => i.book.id === bookId),

      // Helper: get the quantity of a specific book in the cart
      getQuantity: (bookId) =>
        get().items.find((i) => i.book.id === bookId)?.quantity ?? 0,

      // Calculate subtotal, discount, total, and item count
      getSummary: () => {
        const items = get().items;
        let subtotal = 0;
        let discount = 0;
        let itemCount = 0;

        for (const item of items) {
          const itemPrice = item.book.price * item.quantity;
          const itemDiscount = itemPrice * (item.book.discount ?? 0);
          subtotal += itemPrice;
          discount += itemDiscount;
          itemCount += item.quantity;
        }

        const total = subtotal - discount;
        return { subtotal, discount, total, itemCount };
      },
    }),
    {
      name: CART_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
