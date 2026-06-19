export default function Loading() {
  return (
    <div className="min-h-screen bg-ink animate-pulse">
      {/* Header skeleton */}
      <div className="border-b border-ink-line px-6 py-4 flex items-center justify-between">
        <div className="skeleton h-6 w-32 rounded-sm" />
        <div className="hidden md:flex gap-8">
          <div className="skeleton h-3 w-16 rounded-sm" />
          <div className="skeleton h-3 w-16 rounded-sm" />
          <div className="skeleton h-3 w-20 rounded-sm" />
        </div>
        <div className="skeleton h-8 w-24 rounded-sm" />
      </div>
      {/* Hero skeleton */}
      <div className="px-6 pt-16 pb-12 max-w-7xl mx-auto">
        <div className="skeleton h-3 w-48 rounded-sm mb-6" />
        <div className="skeleton h-16 w-full max-w-2xl rounded-sm mb-4" />
        <div className="skeleton h-16 w-3/4 max-w-xl rounded-sm mb-8" />
        <div className="skeleton h-4 w-96 rounded-sm mb-3" />
        <div className="skeleton h-4 w-80 rounded-sm mb-8" />
        <div className="flex gap-3">
          <div className="skeleton h-12 w-36 rounded-sm" />
          <div className="skeleton h-12 w-36 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
