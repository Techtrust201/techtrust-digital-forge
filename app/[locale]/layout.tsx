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
      'x-default': 'https://www.tech-trust.fr/fr',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD ProfessionalService (enriched Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["ProfessionalService", "Organization"],
              "@id": "https://www.tech-trust.fr/#organization",
              "name": "Techtrust",
              "alternateName": "Techtrust Agency",
              "url": "https://www.tech-trust.fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.tech-trust.fr/logo-techtrust.svg",
                "width": 512,
                "height": 512
              },
              "image": "https://www.tech-trust.fr/og-image.jpg",
              "description": "Agence digitale française spécialisée en création de sites web sur mesure (zéro template), growth hacking IA, SEO/SEA/GEO et solutions digitales. 30+ projets livrés, 100% code sur mesure.",
              "slogan": "Transformez votre business avec l'IA",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "62 Imp. Font-Roubert",
                "addressLocality": "Mougins",
                "addressRegion": "Provence-Alpes-Côte d'Azur",
                "postalCode": "06250",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "43.6017",
                "longitude": "6.9950"
              },
              "telephone": "+33699486629",
              "email": "contact@tech-trust.fr",
              "priceRange": "€€-€€€",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Virement, Carte bancaire",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "France"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Provence-Alpes-Côte d'Azur"
                },
                {
                  "@type": "City",
                  "name": "Mougins"
                },
                {
                  "@type": "City",
                  "name": "Cannes"
                },
                {
                  "@type": "City",
                  "name": "Nice"
                },
                {
                  "@type": "City",
                  "name": "Antibes"
                },
                {
                  "@type": "City",
                  "name": "Grasse"
                },
                {
                  "@type": "City",
                  "name": "Marseille"
                },
                {
                  "@type": "City",
                  "name": "Aix-en-Provence"
                },
                {
                  "@type": "City",
                  "name": "Toulon"
                },
                {
                  "@type": "City",
                  "name": "Paris"
                },
                {
                  "@type": "City",
                  "name": "Lyon"
                },
                {
                  "@type": "City",
                  "name": "Toulouse"
                },
                {
                  "@type": "City",
                  "name": "Bordeaux"
                },
                {
                  "@type": "City",
                  "name": "Lille"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+33699486629",
                  "email": "contact@tech-trust.fr",
                  "availableLanguage": ["French", "English"],
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "telephone": "+33699486629",
                  "email": "contact@tech-trust.fr",
                  "availableLanguage": ["French", "English"]
                }
              ],
              "sameAs": [
                "https://linkedin.com/company/techtrust-agency",
                "https://twitter.com/techtrust_fr",
                "https://instagram.com/techtrust_agency",
                "https://facebook.com/techtrust"
              ],
              "knowsAbout": [
                "Création de site web",
                "Growth Hacking",
                "Intelligence Artificielle",
                "SEO",
                "SEA",
                "Google Ads",
                "Community Management",
                "Développement web",
                "E-commerce",
                "Marketing digital"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services Techtrust",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "Création Web",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Création de site vitrine",
                          "description": "Site web professionnel responsive optimisé SEO"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Création de site e-commerce",
                          "description": "Boutique en ligne complète avec paiement sécurisé"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Growth Hacking IA",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Growth Hacking automatisé",
                          "description": "Acquisition client automatisée par intelligence artificielle"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Community Management IA",
                          "description": "Gestion automatisée des réseaux sociaux par IA"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Référencement",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "SEO - Référencement naturel",
                          "description": "Optimisation du référencement naturel sur Google"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "SEA - Google Ads",
                          "description": "Campagnes publicitaires Google Ads optimisées"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "GEO - Google My Business",
                          "description": "Optimisation de la visibilité locale Google My Business"
                        }
                      }
                    ]
                  }
                ]
              },
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 5,
                "maxValue": 15
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
