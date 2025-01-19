export default function HeroSkeleton() {
  return (
    <div className="relative h-[90vh] bg-gray-100 animate-pulse">
      <div className="absolute inset-0 grid grid-cols-4 gap-4 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200" />
        ))}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-6 bg-gray-200 rounded-lg w-full" />
          <div className="h-6 bg-gray-200 rounded-lg w-5/6 mx-auto" />
          <div className="flex justify-center gap-4 mt-8">
            <div className="h-12 w-40 bg-gray-200 rounded-full" />
            <div className="h-12 w-40 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 