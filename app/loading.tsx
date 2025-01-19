import HeroSkeleton from '../components/skeletons/hero-skeleton';
import SectionSkeleton from '../components/skeletons/section-skeleton';

export default function Loading() {
  return (
    <main>
      <HeroSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
    </main>
  );
}
