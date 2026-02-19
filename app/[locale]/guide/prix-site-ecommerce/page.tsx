import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Euro, Clock, Shield, Zap, Star, AlertTriangle, TrendingUp, ShoppingCart } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface PrixEcommercePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrixEcommercePageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Prix site e-commerce 2026 : tarifs, comparatif et guide complet',
    description: 'Combien coûte un site e-commerce en 2026 ? De 2 000€ à 50 000€+ selon vos besoins. Grille tarifaire détaillée, comparatif Shopify vs WooCommerce vs sur-mesure, et conseils. Guide par Techtrust, agence web à Mougins.',
    keywords: [
      'prix site e-commerce', 'tarif site ecommerce', 'combien coute site e-commerce',
      'cout boutique en ligne', 'prix creation site e-commerce', 'tarif creation boutique en ligne',
      'prix site e-commerce shopify', 'prix site e-commerce woocommerce', 'devis site e-commerce',
      'prix site e-commerce sur mesure', 'cout site marchand'
    ],
    openGraph: {
      type: 'article',
      title: 'Prix site e-commerce 2026 : tarifs, comparatif et guide complet',
      description: 'De 2 000€ à 50 000€+ : tout comprendre sur le prix d\'un site e-commerce en 2026.',
      url: `https://www.tech-trust.fr/${locale}/guide/prix-site-ecommerce`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/guide/prix-site-ecommerce`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/guide/prix-site-ecommerce',
        'en': 'https://www.tech-trust.fr/en/guide/prix-site-ecommerce',
        'x-default': 'https://www.tech-trust.fr/fr/guide/prix-site-ecommerce',
      },
    },
  };
}

const pricingTiers = [
  {
    name: 'E-commerce starter',
    priceRange: '2 000€ — 5 000€',
    delay: '2 à 4 semaines',
    ideal: 'Petites boutiques, moins de 50 produits',
    features: [
      'Shopify ou WooCommerce',
      'Jusqu\'à 50 produits',
      'Paiement Stripe / PayPal',
      'Design semi-personnalisé (thème premium)',
      'Responsive mobile',
      'Pages essentielles (accueil, boutique, contact)',
      'Gestion des commandes et du stock',
      'Certificat SSL inclus',
    ],
    limitations: [
      'Design limité aux thèmes existants',
      'Fonctionnalités avancées limitées',
      'SEO basique',
    ],
    color: 'blue',
  },
  {
    name: 'E-commerce professionnel',
    priceRange: '5 000€ — 15 000€',
    delay: '4 à 8 semaines',
    ideal: 'PME, 50 à 500 produits, ambition de croissance',
    features: [
      'Design sur mesure',
      'Jusqu\'à 500 produits',
      'Multi-paiements (CB, virement, Apple Pay)',
      'SEO avancé intégré',
      'Blog intégré',
      'Programme de fidélité',
      'Emails transactionnels personnalisés',
      'Tableau de bord analytique',
      'Gestion des promotions et codes promo',
      'Intégration réseaux sociaux',
    ],
    limitations: [
      'Personnalisations complexes en supplément',
    ],
    color: 'purple',
    recommended: true,
  },
  {
    name: 'E-commerce sur mesure / marketplace',
    priceRange: '15 000€ — 50 000€+',
    delay: '2 à 6 mois',
    ideal: 'Grandes PME, marques, marketplaces',
    features: [
      'Architecture 100% sur mesure',
      'Produits illimités',
      'Multi-vendeurs / marketplace',
      'ERP / CRM intégré',
      'API sur mesure (logistique, comptabilité)',
      'Multi-langue et multi-devise',
      'Click & Collect',
      'Abonnements et paiements récurrents',
      'App mobile compagnon',
      'IA : recommandations produits, chatbot',
    ],
    limitations: [],
    color: 'orange',
  },
];

const comparatifPlatformes = [
  {
    platform: 'E-commerce sur mesure (Next.js / React) — Recommandé',
    prix: '3 000 — 50 000€+',
    avantages: ['Performances imbattables (100/100 PageSpeed)', 'SEO technique natif (SSR/SSG)', 'Zéro commission sur les ventes', 'Design 100% unique', 'Propriété totale du code', 'Scalabilité infinie'],
    inconvenients: ['Budget initial plus élevé', 'Modifications via développeur'],
    ideal: 'Entreprises qui veulent performer, se démarquer et garder le contrôle',
  },
  {
    platform: 'Shopify',
    prix: '2 000 — 15 000€ + abonnement 32-384€/mois',
    avantages: ['Lancement rapide', 'Hébergement inclus'],
    inconvenients: ['Abonnement mensuel obligatoire (384-4 600€/an)', 'Commission de 0,5-2% sur CHAQUE vente', 'Personnalisation très limitée', 'Dépendance totale — migration impossible', 'SEO basique comparé au code sur mesure'],
    ideal: 'Petites boutiques de moins de 50 produits, budget serré',
  },
  {
    platform: 'WooCommerce (WordPress)',
    prix: '2 000 — 20 000€',
    avantages: ['Open source', 'Grande flexibilité en théorie'],
    inconvenients: ['Sécurité critique (WordPress = cible n°1 des hackers)', 'Performances dégradées par les plugins', 'Mises à jour qui cassent le site', 'Extensions premium coûteuses (500-2 000€)', 'Maintenance technique permanente requise'],
    ideal: 'PME avec compétences techniques internes',
  },
  {
    platform: 'PrestaShop',
    prix: '3 000 — 25 000€',
    avantages: ['Conçu pour le marché français', 'Gestion fiscale FR intégrée'],
    inconvenients: ['Interface admin vieillissante', 'Modules premium très coûteux (1 000-5 000€)', 'Performances à optimiser constamment', 'Communauté en déclin face à Shopify', 'Courbe d\'apprentissage élevée'],
    ideal: 'E-commerce B2B avec gros catalogue, si budget limité',
  },
];

const faqItems = [
  {
    question: 'Combien coûte un site e-commerce en 2026 ?',
    answer: 'En 2026, un site e-commerce coûte entre 2 000€ et 50 000€ ou plus selon la complexité. Une boutique Shopify basique démarre à 2 000€ de développement + 32€/mois d\'abonnement. Un e-commerce professionnel sur mesure coûte 5 000-15 000€. Une marketplace ou un projet complexe peut dépasser 50 000€. Chez Techtrust à Mougins, nos solutions e-commerce démarrent à 3 000€.',
  },
  {
    question: 'Shopify ou WooCommerce : lequel choisir ?',
    answer: 'Shopify est idéal si vous voulez lancer rapidement (clé en main, hébergement inclus) mais implique un abonnement mensuel (32-384€) et des commissions. WooCommerce (WordPress) est gratuit et plus flexible mais nécessite de gérer l\'hébergement et la sécurité. Pour moins de 100 produits et un lancement rapide, Shopify. Pour plus de contrôle et un gros catalogue, WooCommerce.',
  },
  {
    question: 'Quelles sont les commissions sur les ventes ?',
    answer: 'Shopify prélève 0,5 à 2% par transaction (sauf avec Shopify Payments). Stripe et PayPal facturent 1,4% + 0,25€ par transaction en Europe. WooCommerce et PrestaShop n\'ont pas de commission plateforme, mais vous payez uniquement les frais du processeur de paiement (Stripe, PayPal). Sur un CA de 100 000€/an, les commissions Shopify représentent 500-2 000€/an en plus.',
  },
  {
    question: 'Combien de temps pour créer un site e-commerce ?',
    answer: 'Un e-commerce starter sur Shopify : 2-4 semaines. Un e-commerce professionnel personnalisé : 4-8 semaines. Un e-commerce sur mesure complexe : 2-6 mois. Ces délais incluent la configuration, le design, l\'intégration des produits, les tests de paiement et la formation.',
  },
  {
    question: 'Quels sont les coûts récurrents d\'un site e-commerce ?',
    answer: 'Hébergement : 20-200€/mois. Abonnement plateforme : 0-384€/mois (Shopify). Maintenance : 100-500€/mois. SSL : gratuit à 200€/an. Email marketing : 20-300€/mois. Commissions sur ventes : 1-3% du CA. Prévoyez 2 000-10 000€/an de frais récurrents minimum.',
  },
  {
    question: 'Le SEO est-il important pour un site e-commerce ?',
    answer: 'Le SEO est crucial pour un e-commerce : 43% du trafic e-commerce provient de la recherche organique. Un bon référencement peut générer des milliers de visites gratuites par mois. Chez Techtrust, nous intégrons le SEO dès la création : structure optimisée, fiches produits SEO-friendly, blog, maillage interne et données structurées. Le retour sur investissement du SEO e-commerce est le plus élevé de tous les canaux marketing.',
  },
  {
    question: 'Puis-je migrer mon site e-commerce existant ?',
    answer: 'Oui, la migration est possible depuis n\'importe quelle plateforme vers une autre. Techtrust gère les migrations avec conservation des URLs (redirections 301), des données produits et clients, et du référencement SEO acquis. Le coût de migration est généralement de 2 000 à 8 000€ selon la complexité et le nombre de produits.',
  },
];

export default async function PrixEcommercePage({ params }: PrixEcommercePageProps) {
  const { locale } = await params;

  const breadcrumbItems = [
    { label: 'Accueil', href: `/${locale}` },
    { label: 'Guide', href: `/${locale}/guide/prix-site-ecommerce` },
    { label: 'Prix site e-commerce', href: `/${locale}/guide/prix-site-ecommerce` },
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
            "headline": "Prix site e-commerce 2026 : tarifs, comparatif et guide complet",
            "description": "Guide complet des prix pour la création d'un site e-commerce en 2026.",
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
            "url": `https://www.tech-trust.fr/${locale}/guide/prix-site-ecommerce`,
            "mainEntityOfPage": `https://www.tech-trust.fr/${locale}/guide/prix-site-ecommerce`
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
          <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
              <Breadcrumbs items={breadcrumbItems} locale={locale} />
              <div className="max-w-4xl mx-auto text-center mt-8">
                <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
                  Guide tarifaire e-commerce 2026
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Prix d&apos;un <span className="text-purple-600">site e-commerce</span> en 2026 : le guide complet
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  De 2 000€ à 50 000€+ : comprenez les vrais coûts de création d&apos;une boutique en ligne, 
                  comparez Shopify, WooCommerce, PrestaShop et les solutions sur mesure.
                </p>

                {/* TL;DR */}
                <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6 text-left max-w-3xl mx-auto shadow-sm">
                  <p className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">En bref (TL;DR)</p>
                  <p className="text-gray-800 leading-relaxed">
                    Un site e-commerce starter coûte 2 000-5 000€ (Shopify/WooCommerce avec thème). Un e-commerce professionnel 
                    personnalisé coûte 5 000-15 000€. Un projet sur mesure ou marketplace démarre à 15 000€ et peut dépasser 50 000€. 
                    Les coûts récurrents (hébergement, maintenance, commissions) représentent 2 000-10 000€/an. Chez Techtrust à 
                    Mougins (Cannes), nos solutions e-commerce démarrent à 3 000€ avec SEO intégré.
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
                  { href: '#grille-tarifaire', label: '1. Grille tarifaire e-commerce 2026' },
                  { href: '#comparatif', label: '2. Shopify vs WooCommerce vs PrestaShop vs Sur-mesure' },
                  { href: '#couts-recurrents', label: '3. Les coûts récurrents à prévoir' },
                  { href: '#checkliste', label: '4. Checklist avant de lancer votre e-commerce' },
                  { href: '#pourquoi-techtrust', label: '5. Pourquoi choisir Techtrust' },
                  { href: '#faq', label: '6. FAQ — Questions fréquentes' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0" aria-hidden="true" />
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
                  Grille tarifaire : prix d&apos;un site e-commerce en 2026
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Fourchettes de prix réalistes en France basées sur notre expérience et l&apos;analyse du marché.
                </p>

                <div className="grid lg:grid-cols-3 gap-8">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`relative bg-white rounded-2xl border-2 p-8 ${
                        tier.recommended
                          ? 'border-purple-600 shadow-xl shadow-purple-600/10 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      } transition-all`}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Meilleur rapport qualité/prix
                        </div>
                      )}
                      <ShoppingCart className="w-8 h-8 text-purple-600 mb-3" aria-hidden="true" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-3xl font-bold text-purple-600 mb-1">{tier.priceRange}</p>
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

          {/* Comparatif des plateformes */}
          <section id="comparatif" className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Shopify vs WooCommerce vs PrestaShop vs Sur-mesure
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">
                  Chaque plateforme a ses forces et ses faiblesses. Voici un comparatif honnête.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
                  <p className="text-sm font-bold text-purple-800 mb-2">L&apos;avis Techtrust :</p>
                  <p className="text-sm text-purple-700">
                    Pour un e-commerce qui performe vraiment sur Google et convertit, le code sur mesure est imbattable. 
                    Shopify est un bon compromis pour tester rapidement, mais ses commissions et ses limites de personnalisation 
                    deviennent vite un frein. WooCommerce/WordPress pose de vrais problèmes de sécurité. 
                    Chez Techtrust, nous codons tout de A à Z pour que votre boutique soit unique, rapide et sécurisée.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {comparatifPlatformes.map((item) => (
                    <div key={item.platform} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.platform}</h3>
                      <p className="text-purple-600 font-semibold mb-1">{item.prix}</p>
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

          {/* Coûts récurrents */}
          <section id="couts-recurrents" className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Les coûts récurrents d&apos;un site e-commerce
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Le prix de création n&apos;est que le début. Voici ce que coûte un e-commerce chaque année.
                </p>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Coûts obligatoires</h3>
                      <div className="space-y-4">
                        {[
                          { item: 'Hébergement web', range: '240 — 2 400€/an', note: 'Cloud scalable recommandé' },
                          { item: 'Abonnement plateforme', range: '0 — 4 600€/an', note: 'Shopify 384€/an à 4 608€/an' },
                          { item: 'Nom de domaine + SSL', range: '10 — 250€/an', note: 'SSL gratuit avec Let\'s Encrypt' },
                          { item: 'Commissions sur ventes', range: '1 — 3% du CA', note: 'Stripe 1,4% + 0,25€/transaction' },
                          { item: 'Maintenance technique', range: '1 200 — 6 000€/an', note: 'Mises à jour, sécurité, monitoring' },
                        ].map((cost) => (
                          <div key={cost.item} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div>
                              <p className="font-medium text-gray-900">{cost.item}</p>
                              <p className="text-xs text-gray-500">{cost.note}</p>
                            </div>
                            <span className="font-bold text-gray-900 whitespace-nowrap text-sm">{cost.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Coûts de croissance</h3>
                      <div className="space-y-4">
                        {[
                          { item: 'SEO e-commerce', range: '500 — 2 000€/mois', note: 'Fiches produits, blog, backlinks' },
                          { item: 'Google Ads / Shopping', range: '500 — 10 000€/mois', note: 'Budget pub + gestion' },
                          { item: 'Email marketing', range: '30 — 500€/mois', note: 'Mailchimp, Klaviyo, Sendinblue' },
                          { item: 'Photos / vidéos produits', range: '500 — 5 000€', note: 'Shooting pro (ponctuel)' },
                          { item: 'Logistique / expédition', range: 'Variable', note: 'Selon volume et prestataire' },
                        ].map((cost) => (
                          <div key={cost.item} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div>
                              <p className="font-medium text-gray-900">{cost.item}</p>
                              <p className="text-xs text-gray-500">{cost.note}</p>
                            </div>
                            <span className="font-bold text-gray-900 whitespace-nowrap text-sm">{cost.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-purple-600">
                    <p className="font-bold text-gray-900 mb-2">Budget total première année (estimation réaliste)</p>
                    <p className="text-gray-700">
                      Pour un e-commerce professionnel avec SEO et marketing de base : <strong>10 000-25 000€ la première année</strong> (création + coûts récurrents + budget marketing). Les années suivantes, prévoyez 5 000-15 000€/an pour la maintenance, le marketing et les évolutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section id="checkliste" className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Checklist : les 10 points essentiels avant de lancer votre e-commerce
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Ne lancez pas votre boutique en ligne sans avoir vérifié ces points critiques.
                </p>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="space-y-4">
                    {[
                      { num: 1, text: 'Étude de marché : votre niche est-elle viable en ligne ? Analysez la concurrence et la demande.' },
                      { num: 2, text: 'Business plan e-commerce : marge brute, panier moyen, taux de conversion cible, seuil de rentabilité.' },
                      { num: 3, text: 'Choix de la plateforme : Shopify pour la simplicité, WooCommerce pour la flexibilité, sur-mesure pour l\'ambition.' },
                      { num: 4, text: 'Photos et descriptions produits : investissez dans des visuels professionnels, c\'est le facteur #1 de conversion.' },
                      { num: 5, text: 'Mentions légales et CGV : obligatoires en France. Prévoyez le droit de rétractation (14 jours) et les CGV complètes.' },
                      { num: 6, text: 'Solution de paiement : Stripe est le standard. Proposez au minimum CB + PayPal + Apple Pay.' },
                      { num: 7, text: 'Logistique et expédition : Colissimo, Mondial Relay, Chronopost. Automatisez avec des plugins d\'expédition.' },
                      { num: 8, text: 'SEO dès le départ : structure URL propre, fiches produits optimisées, données structurées Product schema.' },
                      { num: 9, text: 'Google Analytics 4 + Search Console : mesurez tout dès le premier jour (trafic, conversions, panier moyen).' },
                      { num: 10, text: 'Plan marketing de lancement : SEA Google Shopping, réseaux sociaux, email marketing, influenceurs locaux.' },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.num}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pourquoi Techtrust */}
          <section id="pourquoi-techtrust" className="py-16 lg:py-20 bg-gradient-to-br from-purple-700 to-pink-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
                  Pourquoi créer votre e-commerce avec Techtrust ?
                </h2>
                <p className="text-xl text-purple-100 text-center max-w-3xl mx-auto mb-12">
                  Basée à Mougins (Cannes), notre agence crée des boutiques en ligne performantes qui génèrent du chiffre d&apos;affaires.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                    { icon: Euro, label: 'À partir de 3 000€', desc: 'E-commerce professionnel avec design sur mesure et SEO intégré.' },
                    { icon: TrendingUp, label: 'SEO e-commerce intégré', desc: 'Fiches produits optimisées, données structurées, blog SEO.' },
                    { icon: ShoppingCart, label: 'Toutes plateformes', desc: 'Shopify, WooCommerce, PrestaShop ou sur-mesure Next.js.' },
                    { icon: Shield, label: '30+ projets livrés', desc: 'Sites vitrines, e-commerce et applications web dans tous les secteurs.' },
                    { icon: Star, label: '100% code sur mesure', desc: 'Chaque e-commerce codé de A à Z, performances et SEO maximales.' },
                    { icon: Zap, label: 'Accompagnement complet', desc: 'Du design au SEO en passant par le marketing et la logistique.' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 backdrop-blur rounded-xl p-6">
                      <item.icon className="w-8 h-8 text-purple-200 mb-3" aria-hidden="true" />
                      <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                      <p className="text-purple-100 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/${locale}/contact`}>
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-bold w-full sm:w-auto">
                      Demander un devis gratuit
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href={`/${locale}/pricing`}>
                    <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold w-full sm:w-auto">
                      Voir nos tarifs
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
                  Questions fréquentes sur le prix d&apos;un site e-commerce
                </h2>
                <p className="text-lg text-gray-600 text-center mb-12">
                  Les réponses aux questions les plus posées par nos clients e-commerce.
                </p>

                <div className="space-y-4">
                  {faqItems.map((item) => (
                    <details key={item.question} className="bg-gray-50 rounded-xl overflow-hidden group">
                      <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:text-purple-600 transition-colors list-none flex items-center justify-between">
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
                Prêt à lancer votre boutique en ligne ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Obtenez un devis personnalisé gratuit en 24h. Notre équipe à Mougins (Cannes) vous accompagne 
                de la stratégie au lancement de votre e-commerce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-full sm:w-auto">
                    Demander mon devis e-commerce
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={`/${locale}/guide/prix-site-vitrine`}>
                  <Button size="lg" variant="outline" className="font-bold w-full sm:w-auto">
                    Voir le guide prix site vitrine
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
