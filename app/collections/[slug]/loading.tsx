import { ProductCardSkeleton } from '../../../components/ui/skeleton';

export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4 text-center">
            <div className="h-8 w-1/3 mx-auto bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
