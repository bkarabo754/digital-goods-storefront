import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';

interface CartEmptyStateProps {
  onContinue: () => void;
}

export default function CartEmptyState({ onContinue }: CartEmptyStateProps) {
  return (
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
        onClick={onContinue}
        className="mt-4 px-6 focus-visible:ring-2 focus-visible:ring-primary"
        variant="default"
        aria-label="Continue shopping"
      >
        Continue Shopping
      </Button>
    </div>
  );
}
