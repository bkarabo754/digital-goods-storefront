'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface CartSummaryProps {
  summary: {
    subtotal: number;
    discount: number;
    total: number;
  };
  onCloseAction: () => void; // ✅ Add this line
}

export default function CartSummary({
  summary,
  onCloseAction,
}: CartSummaryProps) {
  return (
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
          <span className="text-foreground">R{summary.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          className="w-full flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => toast.info('Checkout not implemented')}
          aria-label="Proceed to checkout"
        >
          <CreditCard className="w-5 h-5 text-green-700" aria-hidden="true" />
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full focus-visible:ring-2 focus-visible:ring-primary"
          onClick={onCloseAction} // ✅ now works
          aria-label="Continue shopping"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
