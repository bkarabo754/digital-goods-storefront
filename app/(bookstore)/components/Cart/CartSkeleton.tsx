// src/app/(bookstore)/components/Cart/CartSkeleton.tsx
'use client';

import { Skeleton } from '@/app/(bookstore)/components/ui/skeleton';

export default function CartSkeleton() {
  return (
    <div className="w-full sm:max-w-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Cart Items */}
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 items-center p-3 border border-border/30 rounded-xl bg-muted/20"
          >
            <Skeleton className="w-20 h-28 rounded-md" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-3 w-2/5" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-7 w-14 rounded-md" />
                <Skeleton className="h-7 w-7 rounded-md" />
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3 rounded-lg bg-muted/20 p-4 border border-border/30">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
