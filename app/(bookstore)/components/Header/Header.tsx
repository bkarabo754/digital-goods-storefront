'use client';

import { useBookStore } from '@/app/(bookstore)/stores/useBookStore';
import { useCartStore } from '@/app/(bookstore)/stores/useCartStore';
import { Button } from '@/app/(bookstore)/components/ui/button';
import { Input } from '@/app/(bookstore)/components/ui/input';
import { ShoppingCart, ChevronDown, BookOpen, Search } from 'lucide-react';

export function Header() {
  const openCart = useBookStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.items.length);

  const searchQuery = useBookStore((s) => s.searchQuery);
  const setSearchQuery = useBookStore((s) => s.setSearchQuery);
  const sortOrder = useBookStore((s) => s.sortOrder);
  const toggleSortOrder = useBookStore((s) => s.toggleSortOrder);

  return (
    <header className="w-full bg-neutral-900 text-white shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-4 md:gap-0">
        {/* Logo */}
        <h1
          className="flex items-center gap-2 text-2xl font-bold"
          aria-label="Digital Bookstore Home"
        >
          <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
          Digital Bookstore
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-1 items-center gap-3 md:max-w-md w-full">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              aria-hidden="true"
            />
            <Input
              placeholder="Search books..."
              aria-label="Search books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-800 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            aria-label={`Sort books ${sortOrder === 'a-z' ? 'descending' : 'ascending'}`}
            className="flex items-center gap-1 border-neutral-700 text-white hover:bg-neutral-800"
            onClick={toggleSortOrder}
          >
            Sort {sortOrder === 'a-z' ? 'A→Z' : 'Z→A'}
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-3">
          <Button
            onClick={openCart}
            variant="ghost"
            aria-label="Open shopping cart"
            className="relative text-white hover:bg-neutral-800"
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 text-xs text-white w-5 h-5"
                aria-label={`${itemCount} items in cart`}
              >
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
