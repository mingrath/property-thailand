export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="h-4 w-64 bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Title skeleton */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />
          <div className="h-4 w-1/2 bg-gray-200 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery skeleton */}
            <div className="space-y-3">
              <div className="aspect-[16/9] bg-gray-200 rounded-2xl" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-20 h-14 bg-gray-200 rounded-lg flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Price stats skeleton */}
            <div className="bg-brand-cream rounded-2xl p-6 space-y-4">
              <div className="h-10 w-48 bg-gray-200 rounded-xl" />
              <div className="h-4 w-32 bg-gray-200 rounded-full" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 space-y-2 flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    <div className="h-6 w-8 bg-gray-200 rounded" />
                    <div className="h-3 w-12 bg-gray-200 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-3">
              <div className="h-6 w-48 bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded-full" />
                <div className="h-4 w-full bg-gray-200 rounded-full" />
                <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                <div className="h-4 w-4/6 bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* Features skeleton */}
            <div className="space-y-3">
              <div className="h-6 w-48 bg-gray-200 rounded-xl" />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Map skeleton */}
            <div className="space-y-3">
              <div className="h-6 w-32 bg-gray-200 rounded-xl" />
              <div className="aspect-[16/7] bg-gray-200 rounded-2xl" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-36 bg-gray-200 rounded-lg" />
                  <div className="h-4 w-28 bg-gray-200 rounded-full" />
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Similar listings skeleton */}
        <div className="mt-16 pt-12 border-t border-gray-100 space-y-6">
          <div className="h-7 w-48 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-2">
                  <div className="h-6 w-24 bg-gray-200 rounded-lg" />
                  <div className="h-4 w-40 bg-gray-200 rounded-full" />
                  <div className="h-3 w-32 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
