'use client';

import React, { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/(bookstore)/components/ui/dialog';
import { Badge } from '@/app/(bookstore)/components/ui/badge';
import { Button } from '@/app/(bookstore)/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { BookDetailsSkeleton } from './BookDetailsSkeleton';
import { useBookStore } from '@/app/(bookstore)/stores/useBookStore';
import { useCartStore } from '@/app/(bookstore)/stores/useCartStore';
import dynamic from 'next/dynamic';

const DynamicImage = dynamic(() => import('next/image'), { ssr: false });

/**
 * Modal component displaying details of the selected book:
 * - Book cover image
 * - Title, author, genre, description
 * - Price and Add to Cart button
 * - Skeleton fallback while loading
 */
export default function BookDetailsModal() {
  const { selectedBook, isModalOpen, closeModal } = useBookStore();
  const { addToCart, items } = useCartStore();

  // Check if selected book is already in cart
  const isInCart = useMemo(
    () => !!selectedBook && items.some((i) => i.book.id === selectedBook.id),
    [items, selectedBook]
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-xl">
        {/* Modal Header */}
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-left text-2xl font-semibold text-gray-900 dark:text-gray-50">
            {selectedBook ? selectedBook.title : 'Loading...'}
          </DialogTitle>
        </DialogHeader>

        {/* Modal Body: show skeleton if no book selected */}
        {!selectedBook ? (
          <BookDetailsSkeleton />
        ) : (
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Book Cover Image */}
            <div className="relative w-full md:w-1/2 h-[280px] min-h-[280px] rounded-lg overflow-hidden">
              <DynamicImage
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Book Information */}
            <div className="flex-1 space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                by <span className="font-medium">{selectedBook.author}</span>
              </p>

              <Badge variant="secondary" className="mt-1">
                {selectedBook.genre}
              </Badge>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {selectedBook.description}
              </p>

              {/* Price & Add to Cart */}
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    R{selectedBook.price.toFixed(2)}
                  </span>

                  <Button
                    onClick={() => selectedBook && addToCart(selectedBook)}
                    disabled={isInCart}
                    className="flex items-center gap-2 rounded-xl"
                    aria-label={
                      isInCart
                        ? `${selectedBook?.title} is already in your cart`
                        : `Add ${selectedBook?.title} to cart`
                    }
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>

                {/* Inform user if book is already in cart */}
                {isInCart && (
                  <p className="text-xs text-muted-foreground">
                    This book is already in your cart
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
