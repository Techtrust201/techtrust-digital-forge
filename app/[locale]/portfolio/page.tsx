import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Globe, Users, ShoppingCart, Car, Bug, BarChart3, ArrowRight, ExternalLink, Star, CheckCircle, Zap } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedServices from '@/components/RelatedServices';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

export const dynamic = 'force-static';

interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Portfolio & Références — Projets réalisés par Techtrust à Mougins (Cannes)',
    description: 'Découvrez nos projets clients réels : Palais des Festivals de Cannes, Chopard, LC Auto Solutions, NuisiProd et plus. Sites web, e-commerce, SEO et growth hacking sur la Côte d\'Azur.',
    keywords: ['portfolio agence web cannes', 'études de cas', 'projets techtrust', 'réalisations', 'agence web mougins', 'clients côte d\'azur'],
    openGraph: {
      type: 'website',
      title: 'Portfolio & Références — Projets réalisés par Techtrust',
      description: 'Nos clients : Palais des Festivals, Chopard, LC Auto Solutions, NuisiProd. Des résultats concrets et vérifiables.',
      url: `https://www.tech-trust.fr/${locale}/portfolio`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/portfolio`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/portfolio',
        'en': 'https://www.tech-trust.fr/en/portfolio',
        'x-default': 'https://www.tech-trust.fr/fr/portfolio',
      },
    },
  };
}

interface CaseStudy {
  title: string;
  industry: string;
  icon: LucideIcon;
  services: string[];
  description: string;
  challenges: string[];
  solutions: string[];
  results: { metric: string; label: string }[];
  color: string;
  url?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Palais des Festivals — Cannes',
    industry: 'Événementiel & Culture',
    icon: Star,
    services: ['Site web vitrine premium', 'SEO avancé', 'Optimisation performances'],
    description: 'Refonte complète du site web du Palais des Festivals de Cannes, notre plus gros client. Objectif : moderniser l\'image digitale et améliorer l\'expérience utilisateur pour les millions de visiteurs annuels du Festival de Cannes.',
    challenges: [
      'Site legacy lent (LCP > 6 secondes)',
      'Trafic international multilingue complexe',
      'Pics de trafic extrêmes durant le Festival'
    ],
    solutions: [
      'Architecture Next.js avec SSG pour des temps de chargement < 1,5s',
      'Système i18n avec 5 langues et hreflang optimisé',
      'Infrastructure CDN et cache intelligent pour absorber les pics'
    ],
    results: [
      { metric: '+280%', label: 'Trafic organique' },
      { metric: '-72%', label: 'Temps de chargement' },
      { metric: '+45%', label: 'Taux de conversion' },
      { metric: 'Top 3', label: 'Google "festival cannes"' },
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Groupe Chopard — Horlogerie de luxe',
    industry: 'Luxe & E-commerce',
    icon: ShoppingCart,
    services: ['E-commerce sur mesure', 'SEO international', 'Growth Hacking'],
    description: 'Création d\'une plateforme e-commerce de luxe pour le Groupe Chopard. Expérience d\'achat premium avec personnalisation produit, paiement sécurisé multi-devises et intégration CRM.',
    challenges: [
      'Expérience d\'achat qui reflète le positionnement luxe',
      'Multi-devises et livraison internationale',
      'Sécurité renforcée pour les transactions haute valeur'
    ],
    solutions: [
      'Design sur mesure avec animations premium et 3D produit',
      'Intégration Stripe multi-devises avec 3D Secure 2',
      'Architecture headless avec API sécurisée et WAF'
    ],
    results: [
      { metric: '+420%', label: 'Ventes en ligne' },
      { metric: '€2.4M', label: 'CA généré en 12 mois' },
      { metric: '+180%', label: 'Panier moyen' },
      { metric: '99.9%', label: 'Uptime' },
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cabinet d\'Avocats Fiscalistes — Cannes',
    industry: 'Droit & Fiscalité',
    icon: Globe,
    services: ['Site vitrine professionnel', 'SEO local Cannes', 'Google My Business'],
    description: 'Création d\'un site vitrine premium et stratégie de référencement local pour un cabinet d\'avocats fiscalistes à Cannes. Objectif : devenir le cabinet le plus visible sur Google dans le bassin cannois.',
    challenges: [
      'Aucune présence en ligne (pas de site, pas de GMB)',
      'Concurrence forte sur les mots-clés "avocat fiscaliste Cannes"',
      'Nécessité de refléter le sérieux et l\'expertise juridique'
    ],
    solutions: [
      'Site vitrine Next.js optimisé avec schéma LocalBusiness et LegalService',
      'Stratégie SEO local Cannes/PACA avec Google My Business optimisé',
      'Contenu expert : articles de droit fiscal et FAQ structurées pour les rich snippets'
    ],
    results: [
      { metric: 'Top 5', label: '"avocat fiscaliste Cannes"' },
      { metric: '+520%', label: 'Appels entrants' },
      { metric: '4.9★', label: 'Note Google' },
      { metric: '+15', label: 'Nouveaux clients/mois' },
    ],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'LC Auto Solutions — Le Cannet (06)',
    industry: 'Automobile & Services',
    icon: Car,
    services: ['Site web complet', 'SEO local Côte d\'Azur', 'Design responsive'],
    description: 'Création du site web complet pour LC Auto Solutions, spécialiste du vitrage automobile (partenaire A+Glass), du nettoyage professionnel et de l\'achat-revente de véhicules au Cannet, près de Cannes.',
    challenges: [
      'Nouvelle entreprise sans aucune présence digitale',
      'Trois activités différentes à présenter clairement',
      'Besoin de visibilité locale immédiate sur la Côte d\'Azur'
    ],
    solutions: [
      'Site multi-sections avec parcours utilisateur distinct par activité (vitrage, nettoyage, achat-revente)',
      'SEO local optimisé pour Le Cannet, Cannes, Mougins, Antibes et Nice',
      'Design mobile-first avec formulaire de devis intégré et appel direct'
    ],
    results: [
      { metric: 'Page 1', label: '"vitrage auto Le Cannet"' },
      { metric: '+15', label: 'Demandes devis/semaine' },
      { metric: '< 2s', label: 'Temps de chargement' },
      { metric: '100%', label: 'Mobile-friendly' },
    ],
    color: 'from-emerald-500 to-teal-500',
    url: 'https://www.lcvitrages.fr',
  },
  {
    title: 'NuisiProd — Alpes-Maritimes',
    industry: 'Désinsectisation & Dératisation',
    icon: Bug,
    services: ['Site vitrine', 'SEO local 06', 'Formulaire de contact optimisé'],
    description: 'Création du site web professionnel pour NuisiProd, entreprise certifiée de dératisation, désinsectisation et traitement anti-nuisibles dans les Alpes-Maritimes. Urgences 24h/24, 7j/7.',
    challenges: [
      'Secteur de niche avec forte concurrence locale',
      'Besoin de rassurer les clients sur le sérieux et la certification',
      'Interventions d\'urgence nécessitant un contact immédiat'
    ],
    solutions: [
      'Site professionnel avec mise en avant des certifications et de la réactivité',
      'SEO local ciblé sur les Alpes-Maritimes (06) et chaque ville de la Côte d\'Azur',
      'CTA d\'urgence visible en permanence : appel direct + formulaire rapide'
    ],
    results: [
      { metric: 'Page 1', label: '"dératisation Alpes-Maritimes"' },
      { metric: '+10', label: 'Appels/semaine' },
      { metric: '24/7', label: 'Accessibilité urgences' },
      { metric: '< 1.5s', label: 'Temps de chargement' },
    ],
    color: 'from-amber-500 to-orange-500',
    url: 'https://www.nuisiprod.fr',
  },
  {
    title: 'Event Experts — Événementiel',
    industry: 'Événementiel professionnel',
    icon: Zap,
    services: ['Site vitrine', 'Consulting digital', 'SEO'],
    description: 'Accompagnement digital complet pour Event Experts, société spécialisée dans l\'organisation d\'événements professionnels. Création d\'une présence en ligne reflétant l\'expertise et le dynamisme de l\'entreprise.',
    challenges: [
      'Image de marque à construire en ligne',
      'Besoin de showcaser un portfolio événementiel riche',
      'Conversion des visiteurs en demandes de devis'
    ],
    solutions: [
      'Site vitrine avec galerie d\'événements et témoignages clients',
      'Stratégie de contenu orientée événementiel corporate',
      'Optimisation du parcours de conversion avec CTA stratégiques'
    ],
    results: [
      { metric: '+200%', label: 'Visibilité en ligne' },
      { metric: '+8', label: 'Devis/mois via le site' },
      { metric: '3.5%', label: 'Taux de conversion' },
      { metric: '95+', label: 'Score PageSpeed' },
    ],
    color: 'from-pink-500 to-rose-500',
  },
];

const globalStats = [
  { value: '30+', label: 'Projets livrés' },
  { value: '100%', label: 'Code sur mesure' },
  { value: 'PACA', label: 'Expertise locale' },
  { value: '+300%', label: 'Croissance trafic moyenne' },
];

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      {/* ItemList + CollectionPage Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio & Études de cas Techtrust",
            "description": "Découvrez les projets réalisés par Techtrust à Mougins (Cannes) : Palais des Festivals, Chopard, LC Auto Solutions, NuisiProd et plus.",
            "url": `https://www.tech-trust.fr/${locale}/portfolio`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Études de cas Techtrust",
              "numberOfItems": caseStudies.length,
              "itemListElement": caseStudies.map((study, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": study.title,
                  "description": study.description,
                  "creator": {
                    "@type": "Organization",
                    "name": "Techtrust",
                    "url": "https://www.tech-trust.fr"
                  },
                  "about": study.industry,
                  "keywords": study.services.join(', ')
                }
              }))
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />

        <main className="flex-1 pt-20">
          <Breadcrumbs
            locale={locale}
            items={[{ label: 'Portfolio' }]}
          />

          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Nos réalisations
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Des résultats concrets, <span className="bg-gradient-to-r from-custom-blue to-custom-purple bg-clip-text text-transparent">pas des promesses</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Du Palais des Festivals de Cannes aux artisans locaux de la Côte d&apos;Azur, 
                découvrez nos projets clients avec des résultats concrets et vérifiables.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {globalStats.map((stat) => (
                  <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <p className="text-3xl font-bold bg-gradient-to-r from-custom-blue to-custom-purple bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="space-y-16">
                {caseStudies.map((study, index) => (
                  <article key={study.title} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className={`bg-gradient-to-r ${study.color} p-8 text-white`}>
                      <div className="flex items-center gap-3 mb-4">
                        <study.icon className="w-8 h-8" aria-hidden="true" />
                        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{study.industry}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2">{study.title}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {study.services.map((service) => (
                          <span key={service} className="bg-white/10 text-sm px-3 py-1 rounded-full">{service}</span>
                        ))}
                        {study.url && (
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-sm px-3 py-1 rounded-full transition-colors ml-auto"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            Voir le site
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-gray-700 leading-relaxed mb-8 text-lg">{study.description}</p>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full" />
                            Défis
                          </h3>
                          <ul className="space-y-2">
                            {study.challenges.map((challenge) => (
                              <li key={challenge} className="flex items-start gap-2 text-gray-600">
                                <span className="text-red-400 mt-1">-</span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            Solutions Techtrust
                          </h3>
                          <ul className="space-y-2">
                            {study.solutions.map((solution) => (
                              <li key={solution} className="flex items-start gap-2 text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-custom-blue" aria-hidden="true" />
                          Résultats obtenus
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {study.results.map((result) => (
                            <div key={result.label} className="text-center">
                              <p className="text-2xl font-bold text-custom-blue">{result.metric}</p>
                              <p className="text-xs text-gray-600 mt-1">{result.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 lg:py-20 bg-gradient-to-r from-custom-blue to-custom-purple">
            <div className="container mx-auto px-4 max-w-4xl text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Votre projet sera-t-il le prochain ?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Chaque projet commence par une discussion. Parlez-nous de vos objectifs 
                et découvrez comment Techtrust peut les concrétiser.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-custom-blue hover:bg-gray-100">
                  <Link href={localizedHref('/contact')}>
                    Discutons de votre projet
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Link href={localizedHref('/pricing')}>
                    Voir nos tarifs
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <RelatedServices currentSlug="portfolio" locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
