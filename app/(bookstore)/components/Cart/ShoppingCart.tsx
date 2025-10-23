'use client';

import React, { memo, useMemo, Suspense } from 'react';
import { Sheet, SheetContent } from '../ui/sheet';
import { useCartStore } from '@/app/(bookstore)/stores/useCartStore';
import { useBookStore } from '@/app/(bookstore)/stores/useBookStore';
import CartSkeleton from './CartSkeleton';
import CartHeader from '../shopping-cart-items/CartHeader';
import CartEmptyState from '../shopping-cart-items/CartEmptyState';
import CartItemList from '../shopping-cart-items/CartItemList';
import CartSummary from '../shopping-cart-items/CartSummary';

function ShoppingCartInner() {
  // Access cart items and summary functions from the store
  const items = useCartStore((s) => s.items);
  const getSummary = useCartStore((s) => s.getSummary);

  // Memoize cart summary to avoid unnecessary re-renders
  const summary = useMemo(() => getSummary(), [items, getSummary]);

  // Access cart visibility state and close action from book store
  const isCartOpen = useBookStore((s) => s.isCartOpen);
  const closeCart = useBookStore((s) => s.closeCart);

  return (
    // Cart drawer container with open/close control
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-linear-to-b from-background to-muted/30 border-l border-border/50 backdrop-blur-xl shadow-2xl rounded-l-xl">
        <CartHeader summary={summary} />

        {/* Display cart content or empty state with skeleton fallback */}
        <Suspense fallback={<CartSkeleton />}>
          {items.length === 0 ? (
            // Empty cart state
            <CartEmptyState onContinue={closeCart} />
          ) : (
            // Render list of cart items
            <CartItemList items={items} />
          )}
        </Suspense>

        {/* Display cart summary and checkout buttons only if items exist */}
        {items.length > 0 && (
          <CartSummary summary={summary} onCloseAction={closeCart} />
        )}
      </SheetContent>
    </Sheet>
  );
}

// Memoized to prevent unnecessary re-renders
export const ShoppingCart = memo(ShoppingCartInner);
export default ShoppingCart;
