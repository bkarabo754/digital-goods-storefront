'use client';

export function BookDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-pulse p-6">
      <div className="w-full md:w-1/2 h-[280px] bg-muted/30 rounded-lg" />
      <div className="flex-1 space-y-4">
        <div className="h-6 w-2/3 bg-muted/30 rounded-md" />
        <div className="h-4 w-1/3 bg-muted/30 rounded-md" />
        <div className="h-3 w-full bg-muted/30 rounded-md" />
        <div className="h-3 w-5/6 bg-muted/30 rounded-md" />
        <div className="h-3 w-4/6 bg-muted/30 rounded-md" />
        <div className="flex items-center justify-between pt-6">
          <div className="h-6 w-16 bg-muted/30 rounded-md" />
          <div className="h-10 w-28 bg-muted/30 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
