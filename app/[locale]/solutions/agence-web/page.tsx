import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Zap, Shield, Smartphone, PenTool, Search, CheckCircle } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface AgenceWebPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AgenceWebPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Professional Website Creation | Web Agency Techtrust'
      : 'Création de Sites Web Professionnels | Agence Web Techtrust',
    description: isEn
      ? 'Professional website and e-commerce creation. Responsive design, SEO optimization, guaranteed technical performance. 500+ sites created, free quote in 24h.'
      : 'Création de sites web professionnels et e-commerce sur mesure. Design responsive, optimisation SEO, performances techniques garanties. 500+ sites créés, devis gratuit en 24h.',
    keywords: ['création site web', 'agence web', 'développement site internet', 'site web professionnel', 'e-commerce', 'responsive design', 'SEO'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/agence-web`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/agence-web',
        'en': 'https://www.tech-trust.fr/en/solutions/agence-web',
      },
    },
    openGraph: {
      title: isEn ? 'Professional Website Creation | Techtrust' : 'Création de Sites Web Professionnels | Techtrust',
      description: isEn 
        ? 'Transform your online presence with a modern, efficient website optimized for SEO.'
        : 'Transformez votre présence en ligne avec un site web moderne, performant et optimisé pour le référencement.',
      type: 'website',
    },
  };
}

const features = [
  {
    icon: PenTool,
    title: "Design UX/UI sur mesure",
    description: "Interfaces intuitives et attrayantes créées par nos designers experts pour une expérience utilisateur optimale."
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    description: "Sites web parfaitement adaptés à tous les appareils : desktop, tablette, mobile."
  },
  {
    icon: Search,
    title: "Optimisation SEO",
    description: "Référencement naturel optimisé pour positionner votre site dans les premiers résultats Google."
  },
  {
    icon: Zap,
    title: "Performance & Vitesse",
    description: "Temps de chargement ultrarapides pour maximiser les conversions et l'expérience utilisateur."
  },
  {
    icon: Shield,
    title: "Sécurité avancée",
    description: "Protection contre les cyber-menaces et conformité RGPD pour sécuriser vos données."
  },
  {
    icon: Globe,
    title: "Maintenance incluse",
    description: "Maintenance technique, mises à jour régulières et support réactif inclus dans nos services."
  }
];

const services = [
  {
    title: "Site Vitrine",
    description: "Présentez votre entreprise avec élégance grâce à un site vitrine moderne, responsive et optimisé pour convertir vos visiteurs en clients.",
    features: ["Design sur mesure", "Responsive", "Optimisation SEO", "Intégration CMS"]
  },
  {
    title: "E-commerce",
    description: "Boutique en ligne performante avec une expérience d'achat fluide, des paiements sécurisés et une gestion simplifiée de vos produits.",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion des stocks", "Tunnel d'achat optimisé"]
  },
  {
    title: "Application Web",
    description: "Applications web personnalisées pour digitaliser vos processus métier et améliorer la productivité de vos équipes.",
    features: ["Développement sur mesure", "Intégration API", "Tableau de bord", "Sécurité avancée"]
  }
];

export default async function AgenceWebPage({ params }: AgenceWebPageProps) {
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
            "name": "Création de Sites Web",
            "serviceType": "Développement Web",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Création de sites web professionnels, e-commerce et applications web sur mesure.",
            "areaServed": "France",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de création web",
              "itemListElement": services.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-slate-100 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 text-sm font-medium text-blue-600 mb-6">
                  <Globe className="w-4 h-4" />
                  500+ sites web créés
                </span>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Création de <span className="text-blue-600">Sites Web</span> Professionnels
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Transformez votre présence en ligne avec un site web moderne, performant et optimisé pour le référencement. 
                  E-commerce, site vitrine ou application web sur mesure, nous concrétisons votre vision.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link href={localizedHref('/contact')}>
                      Demander un devis gratuit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <Link href={localizedHref('/pricing')}>
                      Voir nos tarifs
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 text-sm ml-2">4.9/5 (127 avis clients)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-blue-600">Services</span> Web
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions web personnalisées pour répondre à tous vos objectifs business
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    
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

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Pourquoi <span className="text-blue-600">Nous Choisir</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Prêt à lancer votre projet web ?
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement. 
                Transformez votre vision en réalité numérique !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href={localizedHref('/contact')}>
                    Demander un devis gratuit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
