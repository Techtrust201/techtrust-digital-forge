import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Résoudre le warning des lockfiles multiples
  outputFileTracingRoot: path.join(__dirname),

  // Rewrites pour fichiers speciaux
  async rewrites() {
    return [
      {
        source: '/llms.txt',
        destination: '/llms-txt',
      },
      {
        source: '/llms-full.txt',
        destination: '/llms-full-txt',
      },
      {
        source: '/.well-known/ai-plugin.json',
        destination: '/well-known-ai-plugin',
      },
    ];
  },

  // Redirections SEO
  async redirects() {
    return [
      // Forcer www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tech-trust.fr' }],
        destination: 'https://www.tech-trust.fr/:path*',
        permanent: true,
      },

      // ===== Anciennes pages help -> pages actuelles =====
      { source: '/help/showcase-website', destination: '/fr/guide/prix-site-vitrine', permanent: true },
      { source: '/help/ecommerce-website', destination: '/fr/guide/prix-site-ecommerce', permanent: true },
      { source: '/help/growth-agency', destination: '/fr/solutions/growth-hacking', permanent: true },
      { source: '/help/agence-nice', destination: '/fr/solutions/agence-web-nice', permanent: true },
      { source: '/help/google-maps', destination: '/fr/solutions/seo-referencement', permanent: true },
      { source: '/help/software-agency', destination: '/fr/solutions/digitales-sur-mesure', permanent: true },
      { source: '/help/website-changes', destination: '/fr/help', permanent: true },
      { source: '/ambassadeur', destination: '/fr/a-propos', permanent: true },

      // ===== Ressources anciennes =====
      { source: '/ressource/helpcenter/:slug', destination: '/fr/help', permanent: true },

      // ===== Pages sans locale prefix -> version FR =====
      { source: '/contact', destination: '/fr/contact', permanent: true },
      { source: '/solutions', destination: '/fr/solutions', permanent: true },
      { source: '/solutions/:slug', destination: '/fr/solutions/:slug', permanent: true },
      { source: '/blog', destination: '/fr/blog', permanent: true },
      { source: '/pricing', destination: '/fr/pricing', permanent: true },
      { source: '/help', destination: '/fr/help', permanent: true },
      { source: '/legal-mentions', destination: '/fr/legal-mentions', permanent: true },
      { source: '/privacy-policy', destination: '/fr/privacy-policy', permanent: true },
      { source: '/terms', destination: '/fr/terms', permanent: true },
      { source: '/a-propos', destination: '/fr/a-propos', permanent: true },

      // ===== Auth pages -> homepage =====
      { source: '/auth/:path*', destination: '/fr', permanent: true },
    ];
  },

  // Headers de securite et performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.supabase.co https://api.indexnow.org https://www.bing.com https://yandex.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff|woff2|ttf|eot|ico|svg|png|jpg|jpeg|gif|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Images externes autorisees
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tech-trust.fr',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
