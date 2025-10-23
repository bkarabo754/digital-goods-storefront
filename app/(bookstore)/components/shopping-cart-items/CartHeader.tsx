import { SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ShoppingBag } from 'lucide-react';

interface CartHeaderProps {
  summary: { itemCount: number };
}

export default function CartHeader({ summary }: CartHeaderProps) {
  return (
    <SheetHeader className="pb-2 border-b border-border/50">
      <SheetTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" /> Your
        Cart
      </SheetTitle>
      <SheetDescription className="text-sm text-muted-foreground">
        {summary.itemCount === 0
          ? 'Your cart is empty.'
          : `${summary.itemCount} ${summary.itemCount === 1 ? 'item' : 'items'} ready for checkout.`}
      </SheetDescription>
    </SheetHeader>
  );
}
