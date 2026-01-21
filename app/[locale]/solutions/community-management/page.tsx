import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, Instagram, Linkedin, Twitter, MessageCircle, BarChart3, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface CommunityManagementPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CommunityManagementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Community Management | Social Media Management'
      : 'Community Management | Gestion des Réseaux Sociaux',
    description: isEn
      ? 'Professional management of your social networks. Content creation, community engagement, analytics. Boost your online presence!'
      : 'Gestion professionnelle de vos réseaux sociaux. Création de contenu, engagement communautaire, analytics. Boostez votre présence en ligne !',
    keywords: ['community management', 'réseaux sociaux', 'social media', 'Instagram', 'LinkedIn', 'création de contenu'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/community-management`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/community-management',
        'en': 'https://www.tech-trust.fr/en/solutions/community-management',
      },
    },
  };
}

const services = [
  {
    icon: Instagram,
    title: "Gestion Instagram",
    description: "Stratégie de contenu, création de posts, stories et reels pour développer votre communauté.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Pro",
    description: "Positionnement B2B, thought leadership et networking professionnel pour votre entreprise.",
  },
  {
    icon: Twitter,
    title: "Twitter/X Strategy",
    description: "Veille, engagement et création de contenu pour une présence active sur X.",
  },
];

export default async function CommunityManagementPage({ params }: CommunityManagementPageProps) {
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
            "name": "Community Management",
            "serviceType": "Social Media Management",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Gestion professionnelle de vos réseaux sociaux et engagement communautaire.",
            "areaServed": "France"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-teal-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-sm font-medium text-green-600 mb-6">
                  <Users className="w-4 h-4" />
                  +10M de followers gérés
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-green-600">Community</span> Management Pro
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Confiez la gestion de vos réseaux sociaux à nos experts. 
                  Création de contenu, engagement, analytics et croissance organique.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href={localizedHref('/contact')}>
                      Développer ma communauté
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-green-600">Plateformes</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <service.icon className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-green-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Développez votre présence sociale
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Contactez-nous pour un audit gratuit de votre présence sur les réseaux sociaux.
              </p>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Demander mon audit gratuit
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
