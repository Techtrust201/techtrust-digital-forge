import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Check, ArrowRight, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.pricing' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/pricing`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/pricing',
        'en': 'https://www.tech-trust.fr/en/pricing',
        'x-default': 'https://www.tech-trust.fr/fr/pricing',
      },
    },
  };
}

const plans = [
  {
    name: "Pro",
    price: "1500",
    period: "projet",
    description: "Parfait pour les startups et petites entreprises",
    features: [
      "Site vitrine jusqu'à 3 pages",
      "Design responsive",
      "Optimisation SEO de base",
      "Formulaire de contact",
      "Hébergement 1 an inclus",
      "Support email"
    ],
    popular: false,
    color: "blue"
  },
  {
    name: "Business",
    price: "2 490",
    period: "projet",
    description: "Pour les entreprises en croissance",
    features: [
      "Site jusqu'à 10 pages",
      "Design premium sur mesure",
      "SEO avancé",
      "Blog intégré",
      "Intégration réseaux sociaux",
      "Analytics avancés",
      "Support prioritaire",
      "Maintenance 1 an"
    ],
    popular: true,
    color: "purple"
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    description: "Solutions sur mesure pour grandes entreprises",
    features: [
      "Application web complète",
      "E-commerce avancé",
      "Intégrations API",
      "Dashboard personnalisé",
      "SLA garanti",
      "Support dédié 24/7",
      "Formation incluse"
    ],
    popular: false,
    color: "green"
  }
];

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      {/* Offer schemas for each plan */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tarifs Techtrust — Agence Web & Growth Hacking",
            "url": `https://www.tech-trust.fr/${locale}/pricing`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Offres Techtrust",
              "numberOfItems": 3,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Offer",
                    "name": "Pro",
                    "description": "Parfait pour les startups et petites entreprises. Site vitrine jusqu'à 3 pages, design responsive, optimisation SEO de base, formulaire de contact, hébergement 1 an inclus.",
                    "price": "1500",
                    "priceCurrency": "EUR",
                    "priceValidUntil": "2026-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "Techtrust",
                      "url": "https://www.tech-trust.fr"
                    },
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Création de site web Pro",
                      "serviceType": "Web Development",
                      "provider": { "@type": "Organization", "name": "Techtrust" }
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Offer",
                    "name": "Business",
                    "description": "Pour les entreprises en croissance. Site jusqu'à 10 pages, design premium sur mesure, SEO avancé, blog intégré, analytics avancés, support prioritaire, maintenance 1 an.",
                    "price": "2490",
                    "priceCurrency": "EUR",
                    "priceValidUntil": "2026-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "Techtrust",
                      "url": "https://www.tech-trust.fr"
                    },
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Création de site web Business",
                      "serviceType": "Web Development",
                      "provider": { "@type": "Organization", "name": "Techtrust" }
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Offer",
                    "name": "Enterprise",
                    "description": "Solutions sur mesure pour grandes entreprises. Application web complète, e-commerce avancé, intégrations API, dashboard personnalisé, SLA garanti, support dédié 24/7.",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "Techtrust",
                      "url": "https://www.tech-trust.fr"
                    },
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Solutions digitales Enterprise",
                      "serviceType": "Custom Software Development",
                      "provider": { "@type": "Organization", "name": "Techtrust" }
                    }
                  }
                }
              ]
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <Breadcrumbs 
            locale={locale} 
            items={[
              { label: 'Tarifs' }
            ]} 
          />
          <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Nos <span className="text-custom-purple">Tarifs</span> Transparents
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions adaptées à tous les budgets, sans mauvaise surprise. 
                Devis gratuit en 24h.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 ${
                      plan.popular ? 'border-custom-purple' : 'border-gray-100'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-custom-purple text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" fill="currentColor" aria-hidden="true" />
                        Plus populaire
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 ml-2">€/{plan.period}</span>}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? 'bg-custom-purple hover:bg-custom-purple/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      <Link href={localizedHref('/contact')}>
                        {plan.price === "Sur devis" ? "Demander un devis" : "Choisir ce plan"}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guides de prix */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Guides de prix détaillés
                </h2>
                <p className="text-lg text-gray-600">
                  Consultez nos guides complets pour comprendre les tarifs du marché.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Link href={localizedHref('/guide/prix-site-vitrine')} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-custom-blue transition-colors mb-2">Prix site vitrine 2026</h3>
                  <p className="text-gray-600 text-sm">De 500€ à 15 000€ : grille tarifaire complète, comparatif des solutions, facteurs de prix et conseils.</p>
                  <span className="inline-flex items-center gap-1 text-custom-blue font-semibold text-sm mt-3">
                    Lire le guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href={localizedHref('/guide/prix-site-ecommerce')} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-custom-purple transition-colors mb-2">Prix site e-commerce 2026</h3>
                  <p className="text-gray-600 text-sm">De 2 000€ à 50 000€+ : comparatif Shopify vs WooCommerce vs PrestaShop, coûts récurrents et checklist.</p>
                  <span className="inline-flex items-center gap-1 text-custom-purple font-semibold text-sm mt-3">
                    Lire le guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 bg-custom-purple text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Besoin d&apos;une solution personnalisée ?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour un devis sur mesure adapté à vos besoins spécifiques.
              </p>
              <Button asChild size="lg" className="bg-white text-custom-purple hover:bg-gray-100">
                <Link href={localizedHref('/contact')}>
                  Obtenir un devis gratuit
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
