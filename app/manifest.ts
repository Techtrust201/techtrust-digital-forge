import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Techtrust — Agence Web & Growth Hacking IA',
    short_name: 'Techtrust',
    description: 'Agence digitale française spécialisée en création de sites web, growth hacking IA, SEO/SEA/GEO et solutions digitales sur mesure.',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7C3AED',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'fr',
    dir: 'ltr',
  };
}
