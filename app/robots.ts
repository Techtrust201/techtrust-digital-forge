import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
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
        ],
      },
    ],
    sitemap: 'https://www.tech-trust.fr/sitemap.xml',
  };
}
