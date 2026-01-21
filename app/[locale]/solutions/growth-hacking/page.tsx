import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Rocket, Target, Mail, MessageSquare, Bot, BarChart3, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface GrowthHackingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GrowthHackingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Growth Hacking & Customer Acquisition | Growth Strategies'
      : 'Growth Hacking & Acquisition Clients | Stratégies de Croissance',
    description: isEn
      ? 'Growth hacking and lead acquisition experts. Automated prospecting, email marketing, SMS, social networks. Multiply your sales by 3 in 90 days!'
      : 'Experts en growth hacking et acquisition de leads. Prospection automatisée, email marketing, SMS, réseaux sociaux. Multipliez vos ventes par 3 en 90 jours !',
    keywords: ['growth hacking', 'acquisition client', 'lead generation', 'prospection digitale', 'marketing automation'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/growth-hacking`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/growth-hacking',
        'en': 'https://www.tech-trust.fr/en/solutions/growth-hacking',
      },
    },
  };
}

const services = [
  {
    icon: Mail,
    title: "Email Marketing IA",
    description: "Campagnes email personnalisées et automatisées avec l'IA pour maximiser vos conversions.",
    features: ["Séquences automatisées", "Personnalisation IA", "A/B Testing", "Analytics avancés"]
  },
  {
    icon: MessageSquare,
    title: "SMS Marketing",
    description: "Campagnes SMS ciblées avec des taux d'ouverture de 98% pour toucher vos prospects.",
    features: ["Envoi en masse", "Segmentation", "Réponses automatiques", "Intégration CRM"]
  },
  {
    icon: Bot,
    title: "Prospection Automatisée",
    description: "Automatisez votre prospection avec des outils IA qui travaillent 24h/24.",
    features: ["LinkedIn automation", "Cold emailing", "Lead scoring", "Nurturing automatique"]
  }
];

export default async function GrowthHackingPage({ params }: GrowthHackingPageProps) {
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
            "name": "Growth Hacking & Acquisition",
            "serviceType": "Marketing Digital",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Stratégies de growth hacking et acquisition de leads via l'IA.",
            "areaServed": "France"
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 text-sm font-medium text-purple-600 mb-6">
                  <Rocket className="w-4 h-4" />
                  +300% de croissance moyenne
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-purple-600">Growth Hacking</span> & Acquisition Clients
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Multipliez votre acquisition de clients avec nos stratégies de growth hacking IA. 
                  Prospection automatisée, email marketing, SMS et plus encore.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Link href={localizedHref('/contact')}>
                      Booster ma croissance
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
                  Nos <span className="text-purple-600">Solutions</span> Growth
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Prêt à accélérer votre croissance ?
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Contactez-nous pour une analyse gratuite de votre potentiel de croissance.
              </p>
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
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
