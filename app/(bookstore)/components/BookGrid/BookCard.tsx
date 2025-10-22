'use client';

import React from 'react';
import Image from 'next/image';
import { Book } from '@/types/book';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/(bookstore)/components/ui/card';
import { Badge } from '@/app/(bookstore)/components/ui/badge';
import { Button } from '@/app/(bookstore)/components/ui/button';
import { Star, ShoppingCart as CartIcon } from 'lucide-react';

export interface BookCardProps {
  book: Book;
  onViewDetails?: (book: Book) => void;
  onAddToCart?: (book: Book) => void;
  isInCart?: boolean;
}

function BookCardComponent({
  book,
  onViewDetails,
  onAddToCart,
  isInCart = false,
}: BookCardProps) {
  const discountedPrice = book.price * (1 - (book.discount ?? 0));
  const hasDiscount = (book.discount ?? 0) > 0;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/40 shadow-sm hover:shadow-xl flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px]">
      {/* Cover Image */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-2xl bg-muted/10">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 220vw"
          priority={false}
          fetchPriority="high"
          quality={75}
        />

        {hasDiscount && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 font-medium shadow">
            {Math.round((book.discount ?? 0) * 100)}% OFF
          </Badge>
        )}

        <Badge
          variant="secondary"
          className="absolute bottom-3 left-3 bg-background/70 backdrop-blur-md text-xs font-medium"
        >
          {book.format}
        </Badge>
      </div>

      {/* Main book information */}
      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3
            className="font-semibold text-base sm:text-sm leading-tight text-foreground line-clamp-2"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">
            {book.rating?.toFixed?.(1) ?? '-'}
          </span>
          <span className="text-xs">· {book.pages} pages</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {book.description}
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="px-4 sm:px-6 pb-4 pt-0 flex flex-col gap-2 w-full">
        {/* Price */}
        <div className="w-full text-left flex items-baseline gap-2">
          <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground">
            R{discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm sm:text-base md:text-sm text-red-500 line-through">
              R{book.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full justify-start">
          <Button
            variant="outline"
            className="w-full sm:w-[120px] h-9 sm:h-10 rounded-lg text-sm sm:text-sm"
            onClick={() => onViewDetails?.(book)}
            aria-label={`View details for ${book.title}`}
          >
            View Details
          </Button>

          <Button
            className="w-full sm:w-[120px] h-9 sm:h-10 rounded-lg text-sm sm:text-sm flex items-center justify-center gap-2"
            onClick={() => onAddToCart?.(book)}
            disabled={isInCart}
            aria-label={
              isInCart
                ? `${book.title} is already in cart`
                : `Add ${book.title} to cart`
            }
          >
            <CartIcon className="w-4 h-4" />
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export const BookCard = React.memo(BookCardComponent);
export default BookCard;
