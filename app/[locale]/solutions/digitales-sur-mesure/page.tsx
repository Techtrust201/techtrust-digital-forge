import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code, Database, Cog, Cloud, Shield, Zap, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface SolutionsSurMesurePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SolutionsSurMesurePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Custom Software Development | Digital Solutions'
      : 'Développement Logiciel Sur Mesure | Solutions Digitales',
    description: isEn
      ? 'Custom software and application development. CRM, ERP, web platforms, APIs. Personalized solutions to optimize your business processes.'
      : 'Développement de logiciels et applications sur mesure. CRM, ERP, plateformes web, APIs. Solutions personnalisées pour optimiser vos processus métier.',
    keywords: ['développement sur mesure', 'logiciel personnalisé', 'CRM', 'ERP', 'application métier', 'API'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/digitales-sur-mesure`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/digitales-sur-mesure',
        'en': 'https://www.tech-trust.fr/en/solutions/digitales-sur-mesure',
      },
    },
  };
}

const services = [
  {
    icon: Database,
    title: "CRM Sur Mesure",
    description: "Gérez vos relations clients avec un CRM adapté à vos processus métier.",
  },
  {
    icon: Cog,
    title: "ERP Personnalisé",
    description: "Optimisez votre gestion d'entreprise avec un ERP sur mesure.",
  },
  {
    icon: Cloud,
    title: "Applications Cloud",
    description: "Applications SaaS évolutives et accessibles partout.",
  },
];

export default async function SolutionsSurMesurePage({ params }: SolutionsSurMesurePageProps) {
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
            "name": "Solutions Digitales Sur Mesure",
            "serviceType": "Développement Logiciel",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Développement de logiciels et applications sur mesure.",
            "areaServed": "France"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 text-sm font-medium text-orange-600 mb-6">
                  <Code className="w-4 h-4" />
                  Solutions 100% personnalisées
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-orange-600">Solutions Digitales</span> Sur Mesure
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Développement de logiciels personnalisés pour répondre aux besoins spécifiques de votre entreprise. 
                  CRM, ERP, applications métier et plus encore.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                    <Link href={localizedHref('/contact')}>
                      Discuter de mon projet
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <service.icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-orange-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Un projet sur mesure ?
              </h2>
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Demander un devis
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
