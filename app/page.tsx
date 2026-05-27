import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HomeHero from '@/components/homepage/HomeHero';
import StatsBar from '@/components/homepage/StatsBar';
import ToolGrid from '@/components/homepage/ToolGrid';

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main>
        <StatsBar />
        <HomeHero />
        <ToolGrid />
      </main>
    </div>
  );
}
