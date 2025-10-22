// Represents a digital book in the catalog
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  discount: number;
  genre: string;
  description: string;
  coverImage: string;
  format: string;
  rating: number;
  pages: number;
  language: string;
  releaseDate: string;
}

// Represents an item in the shopping cart
export interface CartItem {
  book: Book;
  quantity: number;
}

// Cart summary calculations
export interface CartSummary {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

// Define the cart store state and actions for managing cart items and calculating totals
export interface CartState {
  cartItems: CartItem[];
  isLoaded: boolean;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSummary: () => CartSummary;
  isInCart: (bookId: string) => boolean;
  getItemQuantity: (bookId: string) => number;
  setIsLoaded: (isLoaded: boolean) => void;
}
