'use client';

import React, { memo, Suspense, useMemo } from 'react';
import { Book } from '@/types/book';
import { BookGridSkeleton } from './BookGridSkeleton';
import { useBookStore } from '@/app/(bookstore)/stores/useBookStore';
import { useCartStore } from '@/app/(bookstore)/stores/useCartStore';
import { BookCard } from './BookCard';

interface Props {
  books: Book[];
}

// - Filters and sorts books based on search query and sort order.
// - Integrates with cart and modal state using zustand stores.
// - Displays skeleton while loading.

function BookGridComponent({ books }: Props) {
  const { selectBook, searchQuery, sortOrder } = useBookStore();
  const { addToCart, items } = useCartStore();

  // Memoized filtering & sorting logic for performance
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    if (searchQuery)
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    filtered.sort((a, b) =>
      sortOrder === 'a-z'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return filtered;
  }, [books, searchQuery, sortOrder]);

  return (
    <section className="space-y-6">
      {/* Suspense wrapper with skeleton fallback */}
      <Suspense fallback={<BookGridSkeleton />}>
        <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 justify-center">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={() => selectBook(book)}
                onAddToCart={() => addToCart(book)}
                isInCart={items.some((i) => i.book.id === book.id)}
              />
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
}

export const BookGrid = memo(BookGridComponent);
export default BookGrid;
