import HeroSection from '../components/sections/hero';
import StatsBar from '../components/sections/stats-bar';
import CollectionShowcase from '../components/sections/collection-showcase';
import NewArrivals from '../components/sections/new-arrivals';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CollectionShowcase />
      <NewArrivals />
    </>
  );
}
