import { ProductDetailsSkeleton } from '../../../components/ui/skeleton';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <ProductDetailsSkeleton />
      </div>
    </div>
  );
} 