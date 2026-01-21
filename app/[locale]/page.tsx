import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import BlogPreviewSection from '@/components/landing/BlogPreviewSection';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

// SSG par defaut dans App Router
export const dynamic = 'force-static';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr',
        'en': 'https://www.tech-trust.fr/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.tech-trust.fr/${locale}`,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  return (
    <>
      {/* Schema.org pour la page d'accueil */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Techtrust - Agence Web & Growth Hacking",
            "description": "Agence digitale française spécialisée en création de sites web, growth hacking et solutions digitales sur mesure",
            "url": `https://www.tech-trust.fr/${locale}`,
            "inLanguage": locale,
            "mainEntity": {
              "@type": "Organization",
              "name": "Techtrust",
              "description": "Agence digitale qui accompagne les entreprises dans leur transformation numérique",
              "serviceType": ["Création de sites web", "Growth hacking", "Développement sur mesure"],
              "areaServed": "France"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": `https://www.tech-trust.fr/${locale}`
                }
              ]
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <header role="banner">
          <NavbarPublic />
        </header>

        <main role="main">
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
          <BlogPreviewSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
