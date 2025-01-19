export default function SectionSkeleton() {
  return (
    <section className="py-20 animate-pulse">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded-lg w-96 mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl" />
              <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 