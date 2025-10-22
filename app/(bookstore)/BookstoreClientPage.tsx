'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { books } from '@/data/books';
import { Header } from './components/Header/Header';
import { BookGridSkeleton } from './components/BookGrid/BookGridSkeleton';
import { Toaster } from './components/ui/sonner';
import { BookDetailsSkeleton } from './components/BookDetails/BookDetailsSkeleton';

// Lazy-loaded components with skeletons
const BookGrid = dynamic(() => import('./components/BookGrid/BookGrid'), {
  ssr: false,
  loading: () => <BookGridSkeleton />,
});

const ShoppingCart = dynamic(() => import('./components/Cart/ShoppingCart'), {
  ssr: false,
});

const BookDetailsModal = dynamic(
  () => import('./components/BookDetails/BookDetailsModal'),
  {
    ssr: false,
    loading: () => <BookDetailsSkeleton />,
  }
);

export default function BookstoreClientPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Browse Our Collection
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Discover your next favorite read from our curated digital library.
        </p>

        {/* Suspense to show skeletons while lazy-loaded components load. */}
        <Suspense fallback={<BookGridSkeleton />}>
          <BookGrid books={books} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <BookDetailsModal />
      </Suspense>

      <Suspense fallback={null}>
        <ShoppingCart />
      </Suspense>

      <Toaster position="bottom-right" />
    </div>
  );
}
