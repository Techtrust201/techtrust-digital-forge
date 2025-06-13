
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { I18nProviderClient } from '@/locales/client'
import { getServerMetadata } from '@/lib/metadata'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return getServerMetadata(locale)
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="canonical" href={`https://www.tech-trust.fr/${locale}`} />
        <link rel="alternate" hrefLang="fr" href="https://www.tech-trust.fr/fr" />
        <link rel="alternate" hrefLang="en" href="https://www.tech-trust.fr/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.tech-trust.fr/fr" />
        
        {/* Favicon optimisé */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logoTechtrust/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logoTechtrust/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logoTechtrust/favicon-16x16.png" />
        <link rel="manifest" href="/logoTechtrust/site.webmanifest" />
        
        {/* DNS Prefetch pour les performances */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect pour les ressources critiques */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org données structurées pour l'organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Techtrust",
              "description": "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure",
              "url": "https://www.tech-trust.fr",
              "logo": "https://www.tech-trust.fr/logoTechtrust/logo-techtrust.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-XX-XX-XX-XX",
                "contactType": "customer service",
                "availableLanguage": ["French", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "France"
              },
              "sameAs": [
                "https://linkedin.com/company/techtrust-agency",
                "https://instagram.com/techtrust_agency",
                "https://youtube.com/channel/UCX_vW6ah0txEFeMAMr3Si7A"
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
      <body className="font-poppins antialiased">
        <SessionProviderWrapper>
          <I18nProviderClient locale={locale}>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </I18nProviderClient>
        </SessionProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
