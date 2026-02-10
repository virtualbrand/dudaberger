export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-gray-200 rounded animate-pulse" />
              <div className="size-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 space-y-2">
          <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((card) => (
            <div key={card} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full size-12 bg-gray-200 animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
