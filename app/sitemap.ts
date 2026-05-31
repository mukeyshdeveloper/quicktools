import type { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools';
import { SITE_URL, absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getAllTools();

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(tool.canonical),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    // Category hubs for better topical SEO
    {
      url: absoluteUrl('/finance-calculators'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/health-calculators'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/text-tools'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/developer-tools'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...toolEntries,
  ];
}
