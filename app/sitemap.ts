
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tech-trust.fr'
  
  // Pages principales multilingues
  const pages = [
    '',
    '/solutions/agence-web',
    '/solutions/growth-hacking', 
    '/solutions/digitales-sur-mesure',
    '/solutions/community-management',
    '/solutions/consulting-digital',
    '/pricing',
    '/contact',
    '/blog',
    '/help',
    '/legal-mentions',
    '/privacy-policy',
    '/terms'
  ]

  const locales = ['fr', 'en']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Générer les URLs pour chaque page et langue
  locales.forEach(locale => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page.includes('/blog') ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.includes('/solutions') ? 0.9 : page.includes('/blog') ? 0.7 : 0.6,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr${page}`,
            'en': `${baseUrl}/en${page}`,
          }
        }
      })
    })
  })

  // Articles de blog (exemples avec mots-clés SEO)
  const blogPosts = [
    'choisir-meilleure-agence-web-2024',
    'growth-hacking-10-strategies-efficaces', 
    'developpement-sur-mesure-vs-saas',
    'creation-site-web-professionnel-guide-complet',
    'community-management-reseaux-sociaux-2024',
    'automatisation-marketing-lead-generation'
  ]

  blogPosts.forEach(slug => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr/blog/${slug}`,
            'en': `${baseUrl}/en/blog/${slug}`,
          }
        }
      })
    })
  })

  return sitemapEntries
}
