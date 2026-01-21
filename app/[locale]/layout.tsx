import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Metadata globale pour la vitrine
export const metadata: Metadata = {
  metadataBase: new URL('https://www.tech-trust.fr'),
  title: {
    default: 'Techtrust - Agence Web & Growth Hacking | Solutions Digitales',
    template: '%s | Techtrust'
  },
  description: 'Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure. Boostez votre présence en ligne avec nos experts.',
  keywords: ['agence web', 'agence digitale', 'growth hacking', 'création site web', 'solutions digitales', 'développement web', 'SEO', 'community management'],
  authors: [{ name: 'Techtrust' }],
  creator: 'Techtrust',
  publisher: 'Techtrust',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.tech-trust.fr',
    siteName: 'Techtrust',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Techtrust - Agence Digitale' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@techtrust_fr',
    site: '@techtrust_fr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.tech-trust.fr',
    languages: {
      'fr': 'https://www.tech-trust.fr/fr',
      'en': 'https://www.tech-trust.fr/en',
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* DNS Prefetch pour les performances */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr",
              "logo": "https://www.tech-trust.fr/logo-techtrust.svg",
              "description": "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "France"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["French", "English"]
              },
              "sameAs": [
                "https://linkedin.com/company/techtrust-agency",
                "https://twitter.com/techtrust_fr",
                "https://instagram.com/techtrust_agency"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "itemOffered": [
                  {
                    "@type": "Service",
                    "name": "Création de site web",
                    "description": "Développement de sites web sur mesure, e-commerce et applications web"
                  },
                  {
                    "@type": "Service",
                    "name": "Growth Hacking",
                    "description": "Stratégies de croissance digitale et acquisition de leads"
                  },
                  {
                    "@type": "Service",
                    "name": "Solutions digitales sur mesure",
                    "description": "Développement de logiciels personnalisés et applications métier"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="font-poppins antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
