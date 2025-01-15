import HeroSection from '../components/sections/hero';
import StatsBar from '../components/sections/stats-bar';
import CollectionShowcase from '../components/sections/collection-showcase';
import NewArrivals from '../components/sections/new-arrivals';
import Testimonials from '../components/sections/testimonials';
import Heritage from '../components/sections/heritage';
import InstagramFeed from '../components/sections/instagram-feed';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CollectionShowcase />
      <NewArrivals />
      <Testimonials />
      <Heritage />
      <InstagramFeed />
    </>
  );
}
