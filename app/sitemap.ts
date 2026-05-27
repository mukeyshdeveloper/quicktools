import type { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getAllTools();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteUrl}${tool.canonical}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...toolEntries,
  ];
}
