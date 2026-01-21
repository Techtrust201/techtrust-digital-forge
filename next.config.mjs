import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
