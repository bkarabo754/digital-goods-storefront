'use client';

import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem, useCartStore } from '@/app/(bookstore)/stores/useCartStore';

// Dynamically import Next.js Image for better performance and SSR handling
const DynamicImage = dynamic(() => import('next/image'), { ssr: false });

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  // Zustand store actions for modifying cart
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  // Compute discounted price and total per item
  const discounted = item.book.price * (1 - (item.book.discount ?? 0));
  const itemTotal = discounted * item.quantity;

  return (
    <div className="flex gap-4 group p-3 rounded-xl bg-card/60 hover:bg-card/80 border border-border/40 transition-all shadow-sm hover:shadow-md">
      <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0">
        <DynamicImage
          src={item.book.coverImage}
          alt={item.book.title}
          fill
          className="object-cover"
          sizes="80px"
          quality={60}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm line-clamp-2 text-foreground/90">
              {item.book.title}
            </h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-destructive"
              onClick={() => removeFromCart(item.book.id)}
              aria-label={`Remove ${item.book.title} from cart`}
            >
              <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {item.book.author}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-md focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.book.title}`}
            >
              <Minus className="w-3 h-3" />
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
              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.book.title}`}
            >
              <Plus className="w-3 h-3" />
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
}
