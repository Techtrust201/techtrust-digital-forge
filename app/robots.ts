import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const aiDisallow = ['/dashboard/', '/api/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/dashboard',
          '/api/',
          '/_next/',
          '/_old_vite_backup/',
        ],
      },
      // AI Citation crawlers (fetch content live, link back to source)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: aiDisallow,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: aiDisallow,
      },
      // AI Training + Retrieval crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: aiDisallow,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: aiDisallow,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: aiDisallow,
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: aiDisallow,
      },
    ],
    sitemap: 'https://www.tech-trust.fr/sitemap.xml',
  };
}
