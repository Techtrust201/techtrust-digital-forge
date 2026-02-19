import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Euro, Clock, Shield, Zap, Star, AlertTriangle, TrendingUp } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface PrixVitrinePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrixVitrinePageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Prix site vitrine 2026 : tarifs, comparatif et guide complet',
    description: 'Combien coûte un site vitrine en 2026 ? De 500€ à 15 000€ selon vos besoins. Grille tarifaire détaillée, comparatif WordPress vs sur-mesure, facteurs de prix et conseils pour choisir. Guide par Techtrust, agence web à Mougins.',
    keywords: [
      'prix site vitrine', 'tarif site vitrine', 'combien coute site vitrine',
      'cout site internet vitrine', 'prix creation site web', 'tarif creation site internet',
      'prix site vitrine professionnel', 'devis site vitrine', 'prix site vitrine freelance',
      'prix site vitrine agence', 'site vitrine pas cher', 'cout site web professionnel'
    ],
    openGraph: {
      type: 'article',
      title: 'Prix site vitrine 2026 : tarifs, comparatif et guide complet',
      description: 'De 500€ à 15 000€ : tout comprendre sur le prix d\'un site vitrine en 2026. Grille tarifaire, comparatif et conseils.',
      url: `https://www.tech-trust.fr/${locale}/guide/prix-site-vitrine`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/guide/prix-site-vitrine`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/guide/prix-site-vitrine',
        'en': 'https://www.tech-trust.fr/en/guide/prix-site-vitrine',
        'x-default': 'https://www.tech-trust.fr/fr/guide/prix-site-vitrine',
      },
    },
  };
}

const pricingTiers = [
  {
    name: 'Site vitrine basique',
    priceRange: '500€ — 1 500€',
    delay: '1 à 2 semaines',
    ideal: 'Auto-entrepreneur, petite activité locale',
    features: [
      '1 à 5 pages',
      'Template WordPress ou Wix',
      'Design semi-personnalisé',
      'Formulaire de contact basique',
      'Responsive mobile',
      'SEO basique (balises title/meta)',
    ],
    limitations: [
      'Design limité aux templates existants',
      'Performances moyennes',
      'Pas de stratégie SEO avancée',
      'Maintenance à votre charge',
    ],
    color: 'blue',
  },
  {
    name: 'Site vitrine professionnel',
    priceRange: '1 500€ — 5 000€',
    delay: '2 à 4 semaines',
    ideal: 'TPE, PME, professions libérales',
    features: [
      '5 à 15 pages',
      'Design sur mesure',
      'Optimisation SEO complète',
      'Formulaire avancé (devis, rendez-vous)',
      'Intégration Google Analytics & Search Console',
      'Performances optimisées (Core Web Vitals)',
      'Certificat SSL et sécurité',
      'Formation à l\'utilisation',
    ],
    limitations: [
      'Pas de fonctionnalités e-commerce',
      'Animations limitées',
    ],
    color: 'purple',
    recommended: true,
  },
  {
    name: 'Site vitrine premium / sur mesure',
    priceRange: '5 000€ — 15 000€+',
    delay: '4 à 8 semaines',
    ideal: 'PME ambitieuses, startups, marques',
    features: [
      'Pages illimitées',
      'Design premium 100% sur mesure',
      'Animations et micro-interactions',
      'SEO avancé + GEO (visibilité IA)',
      'Multi-langue',
      'Blog intégré avec CMS',
      'Espace client / extranet',
      'Intégrations API tierces',
      'Support et maintenance inclus',
      'Stratégie de contenu',
    ],
    limitations: [],
    color: 'orange',
  },
];

const facteursPrix = [
  {
    icon: Zap,
    title: 'Complexité du design',
    description: 'Un design template coûte 500-1 000€. Un design 100% sur mesure avec maquettes Figma coûte 2 000-5 000€. Les animations et micro-interactions ajoutent 500-2 000€.',
  },
  {
    icon: TrendingUp,
    title: 'Nombre de pages',
    description: 'Chaque page supplémentaire représente 100-500€ selon la complexité. Un site 5 pages vs 20 pages peut doubler le budget.',
  },
  {
    icon: Shield,
    title: 'Fonctionnalités spécifiques',
    description: 'Formulaire de devis avancé (+300-800€), système de réservation (+500-2 000€), espace membre (+1 000-3 000€), chat en direct (+200-500€).',
  },
  {
    icon: Star,
    title: 'Prestataire choisi',
    description: 'Freelance (500-3 000€), petite agence spécialisée comme Techtrust (1 500-8 000€), grande agence (5 000-30 000€+). Le rapport qualité/prix varie énormément.',
  },
  {
    icon: Clock,
    title: 'Délai de livraison',
    description: 'Un projet urgent (livraison en 1 semaine) coûte 30-50% plus cher qu\'un projet planifié sur 4-6 semaines.',
  },
  {
    icon: Euro,
    title: 'Maintenance et hébergement',
    description: 'Hébergement : 5-50€/mois. Maintenance : 50-300€/mois. Nom de domaine : 10-50€/an. Ces coûts récurrents sont souvent oubliés dans le budget initial.',
  },
];

const comparatifPlatformes = [
  {
    platform: 'Code sur mesure (Next.js / React) — Recommandé',
    prix: '1 500 — 15 000€+',
    avantages: ['Performances imbattables (< 1,5s)', 'SEO technique natif (SSR/SSG)', 'Design 100% unique', 'Sécurité maximale — zéro plugin', 'Propriété totale du code source'],
    inconvenients: ['Budget plus élevé que WordPress/Wix', 'Modifications via développeur'],
    ideal: 'Entreprises qui veulent se démarquer et performer sur Google',
  },
  {
    platform: 'WordPress',
    prix: '500 — 5 000€',
    avantages: ['Grande communauté', 'CMS intuitif pour le contenu'],
    inconvenients: ['Sécurité critique (90% des sites piratés sont WordPress)', 'Lenteur (3-5s de chargement moyen)', 'Design générique (thèmes utilisés par des milliers de sites)', 'Mises à jour qui cassent le site', '60 000+ plugins = 60 000+ failles potentielles'],
    ideal: 'Blogs personnels, très petits budgets',
  },
  {
    platform: 'Wix / Squarespace',
    prix: '200 — 1 500€',
    avantages: ['Prix très bas', 'Création rapide sans développeur'],
    inconvenients: ['SEO très limité par la plateforme', 'Performances médiocres', 'Personnalisation restreinte au template', 'Vous ne possédez PAS votre site', 'Impossible de migrer — vous repartez de zéro'],
    ideal: 'Projets personnels, associations à très petit budget',
  },
  {
    platform: 'Webflow',
    prix: '1 500 — 8 000€',
    avantages: ['Design libre', 'CMS intégré'],
    inconvenients: ['Abonnement mensuel obligatoire (14-39$/mois)', 'Dépendance totale à la plateforme', 'Pas de propriété du code', 'SEO limité vs code sur mesure'],
    ideal: 'Sites design-first sans besoin de performance SEO poussée',
  },
];

const faqItems = [
  {
    question: 'Combien coûte un site vitrine en 2026 ?',
    answer: 'En 2026, un site vitrine coûte entre 500€ et 15 000€ selon la complexité. Un site basique avec template démarre à 500€, un site professionnel personnalisé coûte entre 1 500€ et 5 000€, et un site premium sur mesure peut atteindre 15 000€ ou plus. Chez Techtrust à Mougins, nos sites vitrines professionnels démarrent à 1 500€ avec design sur mesure et SEO inclus.',
  },
  {
    question: 'Quel est le prix d\'un site vitrine WordPress ?',
    answer: 'Un site vitrine WordPress coûte entre 500€ et 5 000€. Avec un thème premium (50-100€), le développement peut coûter 500-1 500€ pour un freelance et 1 500-5 000€ pour une agence. Ce prix inclut l\'installation, la personnalisation du thème, la création des pages et l\'optimisation de base.',
  },
  {
    question: 'Quelle est la différence entre un site vitrine et un site e-commerce ?',
    answer: 'Un site vitrine présente votre entreprise et vos services sans vente en ligne (1 500-10 000€). Un site e-commerce intègre une boutique avec paiement en ligne, gestion de stock et expédition (3 000-30 000€). Le site vitrine est idéal pour les prestataires de services, artisans et professions libérales.',
  },
  {
    question: 'Faut-il choisir un freelance ou une agence web ?',
    answer: 'Un freelance coûte 30-50% moins cher qu\'une agence (500-3 000€ vs 1 500-8 000€) mais offre moins de garanties de pérennité et de support. Une agence comme Techtrust offre une équipe pluridisciplinaire (design, développement, SEO), un suivi à long terme et une maintenance professionnelle. Pour un site vitrine de qualité professionnelle, une petite agence spécialisée offre le meilleur rapport qualité/prix.',
  },
  {
    question: 'Combien de temps faut-il pour créer un site vitrine ?',
    answer: 'Un site vitrine basique prend 1 à 2 semaines. Un site professionnel personnalisé prend 2 à 4 semaines. Un site premium sur mesure avec animations et fonctionnalités avancées prend 4 à 8 semaines. Ces délais incluent les phases de maquettage, développement, intégration de contenu et tests.',
  },
  {
    question: 'Quels sont les coûts cachés d\'un site vitrine ?',
    answer: 'Les coûts récurrents souvent oubliés : hébergement (60-600€/an), nom de domaine (10-50€/an), certificat SSL (gratuit à 200€/an), maintenance et mises à jour (600-3 600€/an), email professionnel (50-150€/an). Prévoyez 500-2 000€/an de frais récurrents en plus du coût de création.',
  },
  {
    question: 'Un site vitrine est-il suffisant pour mon activité ?',
    answer: 'Un site vitrine est suffisant si vous vendez des services (consultant, artisan, médecin, avocat, architecte), si vous souhaitez présenter votre entreprise et vos réalisations, ou si vos clients vous contactent avant d\'acheter. Si vous vendez des produits physiques en ligne, un site e-commerce sera nécessaire.',
  },
  {
    question: 'Le prix inclut-il le référencement SEO ?',
    answer: 'Chez Techtrust, oui : tous nos sites vitrines incluent l\'optimisation SEO de base (balises, structure, performances, sitemap). Pour un référencement avancé (stratégie de mots-clés, création de contenu, backlinks, SEO local), un budget supplémentaire de 300-1 500€/mois est recommandé. Attention : beaucoup de prestataires ne l\'incluent pas dans le prix de base.',
  },
];

export default async function PrixSiteVitrinePage({ params }: PrixVitrinePageProps) {
  const { locale } = await params;

  const breadcrumbItems = [
    { label: 'Accueil', href: `/${locale}` },
    { label: 'Guide', href: `/${locale}/guide/prix-site-vitrine` },
    { label: 'Prix site vitrine', href: `/${locale}/guide/prix-site-vitrine` },
  ];

  return (
    <>
      {/* JSON-LD Article + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Prix site vitrine 2026 : tarifs, comparatif et guide complet",
            "description": "Guide complet des prix pour la création d'un site vitrine en 2026. Grille tarifaire, comparatif des plateformes et conseils.",
            "author": {
              "@type": "Organization",
              "name": "Techtrust",
              "@id": "https://www.tech-trust.fr/#organization"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Techtrust",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.tech-trust.fr/logo-techtrust.svg"
              }
            },
            "datePublished": "2026-02-17",
            "dateModified": "2026-02-17",
            "url": `https://www.tech-trust.fr/${locale}/guide/prix-site-vitrine`,
            "mainEntityOfPage": `https://www.tech-trust.fr/${locale}/guide/prix-site-vitrine`
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />

        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
              <Breadcrumbs items={breadcrumbItems} locale={locale} />
              <div className="max-w-4xl mx-auto text-center mt-8">
                <span className="inline-block bg-custom-blue/10 text-custom-blue font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
                  Guide tarifaire 2026
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Prix d&apos;un <span className="text-custom-blue">site vitrine</span> en 2026 : combien ça coûte vraiment ?
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  De 500€ à 15 000€ : notre guide complet pour comprendre les tarifs de création de site vitrine, 
                  comparer les solutions et faire le bon choix pour votre entreprise.
                </p>

                {/* TL;DR */}
                <div className="bg-white border-l-4 border-custom-blue rounded-r-xl p-6 text-left max-w-3xl mx-auto shadow-sm">
                  <p className="text-sm font-bold text-custom-blue uppercase tracking-wide mb-2">En bref (TL;DR)</p>
                  <p className="text-gray-800 leading-relaxed">
                    Un site vitrine basique coûte 500-1 500€, un site professionnel 1 500-5 000€, un site premium sur mesure 5 000-15 000€+. 
                    Les principaux facteurs de prix sont le design (template vs sur mesure), le nombre de pages, les fonctionnalités 
                    spécifiques et le prestataire choisi (freelance vs agence). Chez Techtrust à Mougins (Cannes), nos sites vitrines 
                    professionnels démarrent à 1 500€ avec design personnalisé, SEO intégré et support inclus.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sommaire */}
          <section className="py-12 bg-white border-b">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sommaire</h2>
              <nav className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: '#grille-tarifaire', label: '1. Grille tarifaire complète' },
                  { href: '#facteurs-prix', label: '2. Les facteurs qui influencent le prix' },
                  { href: '#comparatif', label: '3. Comparatif des plateformes' },
                  { href: '#freelance-vs-agence', label: '4. Freelance vs agence : que choisir ?' },
                  { href: '#couts-caches', label: '5. Les coûts cachés à anticiper' },
                  { href: '#pourquoi-techtrust', label: '6. Pourquoi choisir Techtrust' },
                  { href: '#faq', label: '7. FAQ — Questions fréquentes' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="flex items-center gap-2 text-gray-700 hover:text-custom-blue transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <ArrowRight className="w-4 h-4 text-custom-blue flex-shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </section>

          {/* Grille tarifaire */}
          <section id="grille-tarifaire" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Grille tarifaire complète : prix d&apos;un site vitrine en 2026
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Voici les fourchettes de prix réalistes en France en 2026, basées sur notre expérience 
                  de 30+ projets livrés et l&apos;analyse du marché actuel.
                </p>

                <div className="grid lg:grid-cols-3 gap-8">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`relative bg-white rounded-2xl border-2 p-8 ${
                        tier.recommended
                          ? 'border-custom-blue shadow-xl shadow-custom-blue/10 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      } transition-all`}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-custom-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Recommandé
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-3xl font-bold text-custom-blue mb-1">{tier.priceRange}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        <Clock className="w-4 h-4 inline mr-1" aria-hidden="true" />
                        Délai : {tier.delay}
                      </p>
                      <p className="text-sm text-gray-500 mb-6">Idéal pour : {tier.ideal}</p>

                      <div className="space-y-2 mb-6">
                        {tier.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {tier.limitations.length > 0 && (
                        <div className="border-t pt-4 space-y-2">
                          <p className="text-xs font-semibold text-gray-500 uppercase">Limitations</p>
                          {tier.limitations.map((limit) => (
                            <div key={limit} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="text-xs text-gray-500">{limit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Facteurs qui influencent le prix */}
          <section id="facteurs-prix" className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Les 6 facteurs qui déterminent le prix de votre site vitrine
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Pourquoi un site vitrine peut coûter 500€ ou 15 000€ ? Voici les variables qui font toute la différence.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facteursPrix.map((facteur) => (
                    <div key={facteur.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-custom-blue/10 rounded-lg flex items-center justify-center mb-4">
                        <facteur.icon className="w-6 h-6 text-custom-blue" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{facteur.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{facteur.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comparatif des plateformes */}
          <section id="comparatif" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  WordPress, Next.js, Wix ou Webflow : quel choix pour votre site vitrine ?
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">
                  Chaque technologie a ses forces et ses limites. Voici un comparatif honnête pour vous aider à choisir.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
                  <p className="text-sm font-bold text-blue-800 mb-2">L&apos;avis Techtrust :</p>
                  <p className="text-sm text-blue-700">
                    Chez Techtrust, nous ne faisons QUE du code sur mesure (Next.js / React). Pourquoi ? 
                    Parce que c&apos;est la seule solution qui garantit des performances maximales, un SEO technique natif 
                    et une sécurité sans faille. WordPress et Wix conviennent pour des projets à très petit budget, 
                    mais si vous voulez vraiment vous démarquer sur Google, le sur mesure est la seule option sérieuse.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {comparatifPlatformes.map((item) => (
                    <div key={item.platform} className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.platform}</h3>
                      <p className="text-custom-blue font-semibold mb-1">{item.prix}</p>
                      <p className="text-sm text-gray-500 mb-4">Idéal pour : {item.ideal}</p>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-green-700">Avantages</p>
                        {item.avantages.map((a) => (
                          <div key={a} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm text-gray-700">{a}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-orange-700">Inconvénients</p>
                        {item.inconvenients.map((i) => (
                          <div key={i} className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm text-gray-600">{i}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Freelance vs Agence */}
          <section id="freelance-vs-agence" className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Freelance vs agence web : qui choisir pour votre site vitrine ?
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Les deux options ont des avantages et des inconvénients. Le meilleur choix dépend de votre budget, vos attentes et votre besoin d&apos;accompagnement.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Freelance */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Freelance</h3>
                    <p className="text-2xl font-bold text-custom-blue mb-6">500€ — 3 000€</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Prix attractif, moins de charges</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Contact direct et réactif</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Flexibilité sur le périmètre</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-600">Compétences limitées à un domaine</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-600">Risque de disponibilité (congés, surcharge)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-600">Pérennité incertaine à long terme</span>
                      </div>
                    </div>
                  </div>

                  {/* Agence */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-custom-blue shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">Agence web</h3>
                      <span className="bg-custom-blue text-white text-xs px-2 py-0.5 rounded-full">Recommandé</span>
                    </div>
                    <p className="text-2xl font-bold text-custom-blue mb-6">1 500€ — 8 000€</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Équipe pluridisciplinaire (design, dev, SEO)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Suivi et maintenance à long terme</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Stratégie globale (SEO, SEA, contenu)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700">Garantie de résultat et engagement qualité</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-600">Budget plus élevé qu&apos;un freelance</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-600">Processus parfois plus formel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coûts cachés */}
          <section id="couts-caches" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Les coûts cachés d&apos;un site vitrine : ce que personne ne vous dit
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Le prix de création n&apos;est que la partie visible de l&apos;iceberg. Voici les coûts récurrents à anticiper.
                </p>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Coûts annuels récurrents</h3>
                      <div className="space-y-4">
                        {[
                          { item: 'Hébergement web', range: '60 — 600€/an', note: 'Mutualisé vs dédié/cloud' },
                          { item: 'Nom de domaine (.fr)', range: '10 — 50€/an', note: 'Renouvellement annuel' },
                          { item: 'Certificat SSL', range: '0 — 200€/an', note: 'Gratuit avec Let\'s Encrypt' },
                          { item: 'Maintenance technique', range: '600 — 3 600€/an', note: 'Mises à jour, sécurité, sauvegardes' },
                          { item: 'Email professionnel', range: '50 — 150€/an', note: 'Google Workspace ou Microsoft 365' },
                        ].map((cost) => (
                          <div key={cost.item} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div>
                              <p className="font-medium text-gray-900">{cost.item}</p>
                              <p className="text-xs text-gray-500">{cost.note}</p>
                            </div>
                            <span className="font-bold text-gray-900 whitespace-nowrap">{cost.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Coûts optionnels mais recommandés</h3>
                      <div className="space-y-4">
                        {[
                          { item: 'Référencement SEO', range: '300 — 1 500€/mois', note: 'Indispensable pour être visible' },
                          { item: 'Google Ads (SEA)', range: '300 — 5 000€/mois', note: 'Budget pub + gestion' },
                          { item: 'Création de contenu', range: '200 — 1 000€/mois', note: 'Blog, articles, actualités' },
                          { item: 'Photos professionnelles', range: '300 — 2 000€', note: 'Investissement ponctuel' },
                          { item: 'Évolutions du site', range: '100 — 500€/intervention', note: 'Nouvelles pages, fonctionnalités' },
                        ].map((cost) => (
                          <div key={cost.item} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div>
                              <p className="font-medium text-gray-900">{cost.item}</p>
                              <p className="text-xs text-gray-500">{cost.note}</p>
                            </div>
                            <span className="font-bold text-gray-900 whitespace-nowrap">{cost.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-orange-500">
                    <p className="font-bold text-gray-900 mb-2">Budget total la première année (estimation)</p>
                    <p className="text-gray-700">
                      Pour un site vitrine professionnel avec maintenance et SEO de base, comptez entre <strong>3 000€ et 8 000€ la première année</strong> (création + hébergement + maintenance + domaine). Les années suivantes, prévoyez 1 000 à 4 000€/an pour la maintenance et le référencement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pourquoi Techtrust */}
          <section id="pourquoi-techtrust" className="py-16 lg:py-20 bg-gradient-to-br from-custom-blue to-blue-700 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
                  Pourquoi choisir Techtrust pour votre site vitrine ?
                </h2>
                <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto mb-12">
                  Basée à Mougins (à 5 min de Cannes), notre agence web accompagne les entreprises de la Côte d&apos;Azur et de toute la France.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                    { icon: Euro, label: 'À partir de 1 500€', desc: 'Site vitrine professionnel avec design sur mesure, SEO et support inclus.' },
                    { icon: Clock, label: 'Livraison en 2-4 semaines', desc: 'Process efficace avec points d\'avancement réguliers.' },
                    { icon: TrendingUp, label: 'SEO inclus dès le départ', desc: 'Optimisation technique, balises, structure, Core Web Vitals.' },
                    { icon: Shield, label: '30+ projets livrés', desc: 'Expérience éprouvée depuis 2024, tous secteurs confondus.' },
                    { icon: Star, label: '100% code sur mesure', desc: 'Zéro template, zéro WordPress. Chaque site codé de A à Z.' },
                    { icon: Zap, label: 'Technologies modernes', desc: 'Next.js, React, Tailwind CSS pour des performances maximales.' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 backdrop-blur rounded-xl p-6">
                      <item.icon className="w-8 h-8 text-blue-200 mb-3" aria-hidden="true" />
                      <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/${locale}/contact`}>
                    <Button size="lg" className="bg-white text-custom-blue hover:bg-gray-100 font-bold w-full sm:w-auto">
                      Demander un devis gratuit
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href={`/${locale}/pricing`}>
                    <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold w-full sm:w-auto">
                      Voir nos tarifs détaillés
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Questions fréquentes sur le prix d&apos;un site vitrine
                </h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  Les réponses aux questions que nos clients nous posent le plus souvent.
                </p>

                <div className="space-y-4">
                  {faqItems.map((item) => (
                    <details key={item.question} className="bg-gray-50 rounded-xl overflow-hidden group">
                      <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:text-custom-blue transition-colors list-none flex items-center justify-between">
                        <span>{item.question}</span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" aria-hidden="true" />
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Prêt à lancer votre site vitrine ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Obtenez un devis personnalisé gratuit en 24h. Notre équipe à Mougins (Cannes) vous accompagne 
                de A à Z dans la création de votre site web professionnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg" className="bg-custom-blue hover:bg-blue-700 text-white font-bold w-full sm:w-auto">
                    Demander mon devis gratuit
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={`/${locale}/guide/prix-site-ecommerce`}>
                  <Button size="lg" variant="outline" className="font-bold w-full sm:w-auto">
                    Voir le guide prix site e-commerce
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
