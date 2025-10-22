// app/(bookstore)/stores/useBookStore.ts
import { create } from 'zustand';
import { Book } from '@/types/book';

// Manage global UI state for the bookstore, including selected book, modals, cart visibility, search, and sort order.
interface BookStoreState {
  selectedBook: Book | null;
  isModalOpen: boolean;
  isCartOpen: boolean;

  searchQuery: string;
  sortOrder: 'a-z' | 'z-a';

  openCart: () => void;
  closeCart: () => void;
  openModal: () => void;
  closeModal: () => void;

  selectBook: (book: Book) => void;
  setSearchQuery: (q: string) => void;
  toggleSortOrder: () => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  // Initial state
  selectedBook: null,
  isModalOpen: false,
  isCartOpen: false,
  searchQuery: '',
  sortOrder: 'a-z',

  // Cart actions
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // Modal actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Book selection
  selectBook: (book: Book) => set({ selectedBook: book, isModalOpen: true }),

  // Search and sorting
  setSearchQuery: (q: string) => set({ searchQuery: q }),
  toggleSortOrder: () =>
    set((state) => ({ sortOrder: state.sortOrder === 'a-z' ? 'z-a' : 'a-z' })),
}));
