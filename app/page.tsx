import HomeHero from '@/components/homepage/HomeHero';
import StatsBar from '@/components/homepage/StatsBar';
import ToolGrid from '@/components/homepage/ToolGrid';
import { generateWebPageSchema } from '@/lib/schema';
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/site';

export default function Home() {
  const webPageSchema = generateWebPageSchema({
    title: `${SITE_NAME} – Free Online Tools`,
    description: SITE_DESCRIPTION,
    url: '/',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="min-h-screen bg-background text-text">
        <main>
          <StatsBar />
          <HomeHero />
          <ToolGrid />
        </main>
      </div>
    </>
  );
}
