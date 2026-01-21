import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Globe, Rocket, Users, Code, LineChart, Search } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

interface SolutionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.solutions' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions',
        'en': 'https://www.tech-trust.fr/en/solutions',
      },
    },
  };
}

const solutions = [
  {
    icon: Globe,
    title: 'Agence Web',
    description: 'Création de sites web professionnels, e-commerce et applications web sur mesure.',
    href: '/solutions/agence-web',
    color: 'bg-blue-500',
  },
  {
    icon: Rocket,
    title: 'Growth Hacking',
    description: 'Stratégies de croissance digitale et acquisition de leads via l\'IA.',
    href: '/solutions/growth-hacking',
    color: 'bg-purple-500',
  },
  {
    icon: Users,
    title: 'Community Management',
    description: 'Gestion professionnelle de vos réseaux sociaux et engagement communautaire.',
    href: '/solutions/community-management',
    color: 'bg-green-500',
  },
  {
    icon: Code,
    title: 'Solutions Sur Mesure',
    description: 'Développement de logiciels personnalisés et applications métier.',
    href: '/solutions/digitales-sur-mesure',
    color: 'bg-orange-500',
  },
  {
    icon: LineChart,
    title: 'Consulting Digital',
    description: 'Conseil et stratégie pour votre transformation numérique.',
    href: '/solutions/consulting-digital',
    color: 'bg-pink-500',
  },
  {
    icon: Search,
    title: 'SEO & Référencement',
    description: 'Optimisation pour les moteurs de recherche et visibilité en ligne.',
    href: '/solutions/seo-referencement',
    color: 'bg-teal-500',
  },
];

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Solutions Digitales Techtrust",
            "description": "Découvrez nos solutions digitales pour transformer votre business",
            "itemListElement": solutions.map((solution, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": solution.title,
                "description": solution.description,
                "url": `https://www.tech-trust.fr/${locale}${solution.href}`
              }
            }))
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Nos <span className="text-custom-blue">Solutions</span> Digitales
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions complètes pour accompagner votre transformation digitale, 
                de la création de site web à l'acquisition de clients.
              </p>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution) => (
                  <Link
                    key={solution.title}
                    href={localizedHref(solution.href)}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`w-14 h-14 ${solution.color} rounded-xl flex items-center justify-center mb-6`}>
                      <solution.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-custom-blue transition-colors">
                      {solution.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {solution.description}
                    </p>
                    <div className="flex items-center text-custom-blue font-medium">
                      En savoir plus
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-custom-blue text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Prêt à transformer votre business ?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.
              </p>
              <Link
                href={localizedHref('/contact')}
                className="inline-flex items-center bg-white text-custom-blue px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Démarrer mon projet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
