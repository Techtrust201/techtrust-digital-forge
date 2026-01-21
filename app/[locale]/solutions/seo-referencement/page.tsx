import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search, TrendingUp, BarChart3, Target, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface SeoReferencementPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SeoReferencementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'SEO & Search Engine Optimization | Natural Referencing'
      : 'SEO & Référencement Naturel | Optimisation Moteurs de Recherche',
    description: isEn
      ? 'Improve your visibility on Google with our SEO strategies. Audit, optimization, content and netlinking.'
      : 'Améliorez votre visibilité sur Google avec nos stratégies SEO. Audit, optimisation, contenu et netlinking.',
    keywords: ['SEO', 'référencement naturel', 'optimisation Google', 'audit SEO', 'netlinking'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/seo-referencement`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/seo-referencement',
        'en': 'https://www.tech-trust.fr/en/solutions/seo-referencement',
      },
    },
  };
}

const services = [
  {
    icon: Search,
    title: "Audit SEO Complet",
    description: "Analyse technique et sémantique de votre site pour identifier les opportunités.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation On-Page",
    description: "Optimisation du contenu, des balises et de la structure de votre site.",
  },
  {
    icon: Target,
    title: "Netlinking",
    description: "Acquisition de backlinks de qualité pour renforcer votre autorité.",
  },
];

export default async function SeoReferencementPage({ params }: SeoReferencementPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SEO & Référencement Naturel",
            "serviceType": "Search Engine Optimization",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Optimisation pour les moteurs de recherche et amélioration de la visibilité en ligne.",
            "areaServed": "France"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-teal-50 to-cyan-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-teal-100 rounded-full px-4 py-2 text-sm font-medium text-teal-600 mb-6">
                  <Search className="w-4 h-4" />
                  Experts SEO certifiés
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-teal-600">SEO</span> & Référencement Naturel
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Améliorez votre visibilité sur Google et attirez plus de clients qualifiés. 
                  Audit, optimisation et stratégie de contenu personnalisée.
                </p>
                
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                  <Link href={localizedHref('/contact')}>
                    Demander un audit SEO
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <service.icon className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-teal-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Boostez votre visibilité Google
              </h2>
              <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Demander un audit gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
