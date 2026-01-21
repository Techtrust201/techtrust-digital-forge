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
    ];
  },

  // Headers de securite
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
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
