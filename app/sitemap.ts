import { MetadataRoute } from 'next';
import { blogArticles } from '@/lib/blog-data';
import { cities } from '@/lib/geo-data';
import { geoServices } from '@/lib/geo-services-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tech-trust.fr';
  const locales = ['fr', 'en'];
  
  // Pages vitrine UNIQUEMENT - jamais /dashboard/*
  const publicPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/solutions', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/solutions/agence-web', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/solutions/growth-hacking', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/solutions/community-management', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions/digitales-sur-mesure', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions/consulting-digital', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions/seo-referencement', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/careers', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/guide/prix-site-vitrine', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/guide/prix-site-ecommerce', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/help', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/legal-mentions', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static public pages
  for (const locale of locales) {
    for (const page of publicPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr${page.path}`,
            'en': `${baseUrl}/en${page.path}`,
          },
        },
      });
    }
  }

  // Blog article pages (dynamic)
  for (const locale of locales) {
    for (const article of blogArticles) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${article.slug}`,
        lastModified: new Date(article.updatedDate || article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr/blog/${article.slug}`,
            'en': `${baseUrl}/en/blog/${article.slug}`,
          },
        },
      });
    }
  }

  // Geo landing pages (all services x all cities)
  for (const locale of locales) {
    for (const service of geoServices) {
      for (const city of cities) {
        const slug = `${service.prefix}${city.slug}`;
        entries.push({
          url: `${baseUrl}/${locale}/solutions/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              'fr': `${baseUrl}/fr/solutions/${slug}`,
              'en': `${baseUrl}/en/solutions/${slug}`,
            },
          },
        });
      }
    }
  }

  return entries;
}
