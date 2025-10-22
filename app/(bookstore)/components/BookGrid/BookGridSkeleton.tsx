export function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[300px] bg-muted/30 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}
