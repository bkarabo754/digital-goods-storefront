'use client';

import React, { memo, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ShoppingBag, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { useCartStore } from '@/app/(bookstore)/stores/useCartStore';
import { useBookStore } from '@/app/(bookstore)/stores/useBookStore';
import CartSkeleton from './CartSkeleton';

const DynamicImage = dynamic(() => import('next/image'), { ssr: false });

function ShoppingCartInner() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getSummary = useCartStore((s) => s.getSummary);
  const summary = useMemo(() => getSummary(), [items, getSummary]);

  const isCartOpen = useBookStore((s) => s.isCartOpen);
  const closeCart = useBookStore((s) => s.closeCart);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-linear-to-b from-background to-muted/30 border-l border-border/50 backdrop-blur-xl shadow-2xl rounded-l-xl">
        {/* Header */}
        <SheetHeader className="pb-2 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" />{' '}
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {summary.itemCount === 0
              ? 'Your cart is empty.'
              : `${summary.itemCount} ${summary.itemCount === 1 ? 'item' : 'items'} ready for checkout.`}
          </SheetDescription>
        </SheetHeader>

        {/* Content */}
        <Suspense fallback={<CartSkeleton />}>
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                <ShoppingBag
                  className="w-10 h-10 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Add some books to your cart and continue your reading journey.
              </p>
              <Button
                onClick={closeCart}
                className="mt-4 px-6 focus-visible:ring-2 focus-visible:ring-primary"
                variant="default"
                aria-label="Continue shopping"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="flex-1 max-h-[calc(100vh-250px)] -mx-6 px-6 mt-4">
              <div className="space-y-6 py-4">
                {items.map((item) => {
                  const discounted =
                    item.book.price * (1 - (item.book.discount ?? 0));
                  const itemTotal = discounted * item.quantity;

                  return (
                    <div
                      key={item.book.id}
                      className="flex gap-4 group p-3 rounded-xl bg-card/60 hover:bg-card/80 border border-border/40 transition-all shadow-sm hover:shadow-md"
                    >
                      {/* Book Cover */}
                      <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0">
                        <DynamicImage
                          src={item.book.coverImage}
                          alt={item.book.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                          fetchPriority="high"
                          quality={60}
                        />
                      </div>

                      {/* Book Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm line-clamp-2 text-foreground/90">
                              {item.book.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-destructive"
                              onClick={() => removeFromCart(item.book.id)}
                              aria-label={`Remove ${item.book.title} from cart`}
                            >
                              <Trash2
                                className="w-4 h-4 text-destructive"
                                aria-hidden="true"
                              />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            {item.book.author}
                          </p>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-md focus-visible:ring-2 focus-visible:ring-primary"
                              onClick={() =>
                                updateQuantity(item.book.id, item.quantity - 1)
                              }
                              aria-label={`Decrease quantity of ${item.book.title}`}
                            >
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            </Button>

                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.book.id,
                                  Math.max(1, parseInt(e.target.value || '1'))
                                )
                              }
                              className="w-14 h-7 text-center text-sm border-border/40"
                              min={1}
                              aria-label={`Quantity of ${item.book.title}`}
                            />

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-md focus-visible:ring-2 focus-visible:ring-primary"
                              onClick={() =>
                                updateQuantity(item.book.id, item.quantity + 1)
                              }
                              aria-label={`Increase quantity of ${item.book.title}`}
                            >
                              <Plus className="w-3 h-3" aria-hidden="true" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              R{itemTotal.toFixed(2)}
                            </p>
                            {item.book.discount > 0 && (
                              <p className="text-xs text-red-500 line-through">
                                R{(item.book.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Discount Badge */}
                        {item.book.discount > 0 && (
                          <div className="mt-2">
                            <span className="text-xs bg-emerald-600/10 text-emerald-600 px-2 py-0.5 rounded-full">
                              {Math.round((item.book.discount ?? 0) * 100)}% off
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </Suspense>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="sticky bottom-0 left-0 w-full bg-linear-to-t from-background/95 to-background/60 backdrop-blur-md border-t border-border/50 px-6 py-5 space-y-4">
            <div className="w-full space-y-2 rounded-lg bg-muted/30 p-4 border border-border/30 shadow-inner">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  R{summary.subtotal.toFixed(2)}
                </span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-red-600">
                    -R{summary.discount.toFixed(2)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">
                  R{summary.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="w-full flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => toast.info('Checkout not implemented')}
                aria-label="Proceed to checkout"
              >
                <CreditCard
                  className="w-5 h-5 text-green-700"
                  aria-hidden="true"
                />
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full focus-visible:ring-2 focus-visible:ring-primary"
                onClick={closeCart}
                aria-label="Continue shopping"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export const ShoppingCart = memo(ShoppingCartInner);
export default ShoppingCart;
