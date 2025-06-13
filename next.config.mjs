/** @type {import('next').NextConfig} */
const nextConfig = {
  // Liste des paquets externes à exclure du bundling côté serveur (Next.js 15)
  serverExternalPackages: ["@prisma/client"],
  images: {
    domains: ["localhost"],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
