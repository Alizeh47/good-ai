import Navbar from '../components/layout/header/navbar'
import Footer from '../components/layout/footer'
import HeroSection from '../components/sections/hero/hero-section'
import CollectionsGrid from '../components/sections/collections'
import Statistics from '../components/sections/statistics'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Statistics />
        <CollectionsGrid />
      </main>
      <Footer />
    </>
  )
}
