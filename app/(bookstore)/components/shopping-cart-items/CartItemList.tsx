'use client';

import { CartItem } from '../../stores/useCartStore';
import { ScrollArea } from '../ui/scroll-area';
import CartItemCard from './CartItemCard';

interface CartItemListProps {
  items: CartItem[];
}

export default function CartItemList({ items }: CartItemListProps) {
  return (
    <ScrollArea className="flex-1 max-h-[calc(100vh-250px)] -mx-6 px-6 mt-4 pb-40">
      <div className="space-y-6 py-4">
        {items.map((item) => (
          <CartItemCard key={item.book.id} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
}
