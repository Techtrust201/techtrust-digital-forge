import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  TrendingUp, 
  Globe, 
  Target, 
  CheckCircle, 
  Bot, 
  MessageSquare, 
  Award,
  MapPin,
  MousePointer,
  FileText,
  Link2,
  Settings,
  Eye,
  Sparkles,
  Brain,
  Star
} from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-static';

interface SeoReferencementPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SeoReferencementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'SEO & Search Engine Optimization | Google & AI Visibility - Techtrust'
      : 'SEO & Référencement | Visibilité Google & IA - Techtrust',
    description: isEn
      ? 'SEO, SEA and GEO experts: boost your visibility on Google and AI (ChatGPT, Perplexity). Free audit, custom strategy, +500% organic traffic guaranteed.'
      : 'Experts SEO, SEA et GEO : boostez votre visibilité sur Google et les IA (ChatGPT, Perplexity). Audit gratuit, stratégie sur mesure, +500% trafic organique garanti.',
    keywords: ['SEO', 'référencement naturel', 'Google Ads', 'SEA', 'GEO', 'ChatGPT SEO', 'Perplexity optimization', 'référencement Google', 'agence SEO', 'audit SEO', 'backlinks', 'netlinking', 'SEO local', 'Core Web Vitals'],
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
    icon: FileText,
    title: "SEO On-Page",
    description: "Optimisation du contenu, balises meta, structure sémantique HTML5, maillage interne et optimisation des images pour un référencement optimal.",
    features: ["Balises title & meta", "Structure Hn optimisée", "Contenu sémantique", "Maillage interne"]
  },
  {
    icon: Settings,
    title: "SEO Technique",
    description: "Core Web Vitals, vitesse de chargement, architecture mobile-first, crawlabilité et indexation optimale par les robots.",
    features: ["Core Web Vitals", "Mobile-first indexing", "Sitemap & robots.txt", "Schema.org"]
  },
  {
    icon: Link2,
    title: "SEO Off-Page",
    description: "Stratégie de netlinking éthique, acquisition de backlinks de qualité et développement de l'autorité de domaine.",
    features: ["Backlinks premium", "Guest blogging", "Digital PR", "Autorité domaine"]
  },
  {
    icon: MapPin,
    title: "SEO Local",
    description: "Optimisation Google Business Profile, référencement Google Maps, gestion des avis et cohérence NAP.",
    features: ["Google Business", "Google Maps", "Avis clients", "Citations locales"]
  },
  {
    icon: MousePointer,
    title: "SEA - Google Ads",
    description: "Campagnes publicitaires Search, Shopping, Display et YouTube pour une visibilité immédiate et un ROI mesurable.",
    features: ["Google Search Ads", "Google Shopping", "Display & YouTube", "Performance Max"]
  },
  {
    icon: Bot,
    title: "GEO - Visibilité IA",
    description: "Optimisation pour ChatGPT, Perplexity, Claude et Gemini. Soyez recommandé par les intelligences artificielles.",
    features: ["ChatGPT optimization", "Perplexity visibility", "E-E-A-T renforcé", "Citations IA"]
  }
];

const geoFeatures = [
  {
    icon: Brain,
    title: "Contenu citable par l'IA",
    description: "Création de contenus structurés, factuels et sourcés que les LLMs peuvent facilement citer et recommander."
  },
  {
    icon: FileText,
    title: "Schema.org enrichi",
    description: "Données structurées avancées (FAQ, How-to, Article) pour aider les IA à comprendre votre contenu."
  },
  {
    icon: Award,
    title: "Expertise E-E-A-T",
    description: "Renforcement de votre Expérience, Expertise, Autorité et Confiance pour être reconnu comme source fiable."
  },
  {
    icon: Eye,
    title: "Monitoring IA",
    description: "Suivi de vos mentions et recommandations dans ChatGPT, Perplexity, Claude, Gemini et Copilot."
  }
];

const methodology = [
  {
    step: "01",
    title: "Audit SEO complet",
    description: "Analyse technique approfondie, étude de la concurrence, audit de contenu et évaluation des backlinks."
  },
  {
    step: "02",
    title: "Stratégie personnalisée",
    description: "Plan d'action SEO/SEA/GEO sur mesure avec objectifs SMART et KPIs précis."
  },
  {
    step: "03",
    title: "Optimisation continue",
    description: "Implémentation des recommandations, création de contenu optimisé et amélioration technique."
  },
  {
    step: "04",
    title: "Reporting mensuel",
    description: "Suivi des positions, analyse du trafic, mesure du ROI et recommandations d'évolution."
  }
];

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechStart",
    content: "Grâce à Techtrust, nous sommes passés de la page 5 à la position 1 sur nos mots-clés principaux. Notre trafic organique a augmenté de 340% en 6 mois.",
    rating: 5
  },
  {
    name: "Jean-Pierre Dubois",
    role: "Directeur Marketing, ModaLux",
    content: "L'approche GEO est révolutionnaire. Nous sommes maintenant régulièrement cités par ChatGPT quand les utilisateurs demandent des recommandations dans notre secteur.",
    rating: 5
  },
  {
    name: "Marie Lefevre",
    role: "Fondatrice, BioBeauté",
    content: "Les campagnes Google Ads combinées au SEO ont multiplié notre CA par 4. L'équipe est réactive et les résultats parlent d'eux-mêmes.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Combien de temps faut-il pour voir les résultats en SEO ?",
    answer: "Le SEO est un investissement à moyen-long terme. Les premiers résultats apparaissent généralement entre 3 et 6 mois, avec une progression continue sur 12-18 mois pour des résultats optimaux."
  },
  {
    question: "Quelle est la différence entre SEO et SEA ?",
    answer: "Le SEO (référencement naturel) génère du trafic organique gratuit sur le long terme. Le SEA (publicité payante) offre une visibilité immédiate mais nécessite un budget publicitaire continu. L'idéal est de combiner les deux."
  },
  {
    question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
    answer: "Le GEO est l'optimisation pour les moteurs génératifs comme ChatGPT, Perplexity ou Claude. L'objectif est d'être cité et recommandé par ces IA quand les utilisateurs posent des questions dans votre domaine."
  },
  {
    question: "Comment mesurez-vous le ROI de vos actions SEO ?",
    answer: "Nous suivons les positions, le trafic organique, les conversions, le chiffre d'affaires généré et le coût par acquisition. Vous recevez un reporting mensuel détaillé avec tous ces KPIs."
  }
];

const stats = [
  { value: "+500%", label: "Trafic organique moyen" },
  { value: "89%", label: "Clients en Top 3 Google" },
  { value: "150+", label: "Projets SEO réalisés" },
  { value: "4.9/5", label: "Satisfaction client" }
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
            "name": "SEO & Référencement Digital",
            "serviceType": "Search Engine Optimization",
            "provider": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr"
            },
            "description": "Services complets de référencement : SEO, SEA, GEO pour une visibilité maximale sur Google et les IA.",
            "areaServed": "France",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de référencement",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO - Référencement naturel",
                    "description": "Optimisation complète pour les moteurs de recherche"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEA - Google Ads",
                    "description": "Campagnes publicitaires Google pour une visibilité immédiate"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "GEO - Visibilité IA",
                    "description": "Optimisation pour être recommandé par ChatGPT, Perplexity et autres IA"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "89"
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-green-50 to-emerald-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-sm font-medium text-green-700 mb-6">
                    <TrendingUp className="w-4 h-4" />
                    Top 1% Google & IA
                  </span>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                    SEO & <span className="text-green-600">Référencement</span>
                    <br />
                    <span className="text-green-600">Digital</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Dominez Google <strong>et</strong> les IA génératives. Notre approche unique combine SEO traditionnel, 
                    publicité Google Ads et optimisation GEO pour être recommandé par ChatGPT, Perplexity et Claude.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">+500% trafic organique</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Top 3 Google</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Visibilité IA</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <Link href={localizedHref('/contact')}>
                        Audit SEO gratuit
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                      <Link href={localizedHref('/pricing')}>
                        Voir nos offres
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="relative">
                    {/* Search results mockup */}
                    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-500 text-sm">
                          meilleure agence digitale paris
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Position 1</span>
                            <Globe className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-green-700 font-medium text-sm">www.votre-site.fr</p>
                          <p className="text-gray-900 font-semibold">Votre Entreprise - Experts Digitaux</p>
                          <p className="text-gray-600 text-sm">L&apos;agence digitale de référence à Paris...</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 opacity-60">
                          <p className="text-gray-500 text-sm">www.concurrent-1.fr</p>
                          <p className="text-gray-700 font-medium">Concurrent 1</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 opacity-40">
                          <p className="text-gray-500 text-sm">www.concurrent-2.fr</p>
                          <p className="text-gray-700 font-medium">Concurrent 2</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI recommendation bubble */}
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-600 to-violet-700 text-white rounded-2xl p-4 shadow-xl max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5" />
                        <span className="text-sm font-medium">ChatGPT recommande</span>
                      </div>
                      <p className="text-sm opacity-90">&quot;Je vous recommande Votre Entreprise pour leur expertise en...&quot;</p>
                    </div>
                    
                    <div className="absolute -top-4 -left-4 bg-amber-500 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      GEO Ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Nos Services
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Solutions de <span className="text-green-600">Référencement</span> Complètes
                </h2>
                <p className="text-lg text-gray-600">
                  Du SEO traditionnel au GEO révolutionnaire, nous couvrons tous les canaux de visibilité digitale
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Card key={service.title} className="h-full hover:shadow-xl transition-all duration-300 border-gray-100">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* GEO Section */}
          <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Nouveau : GEO - Generative Engine Optimization
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Soyez recommandé par <span className="text-purple-300">l&apos;IA</span>
                </h2>
                <p className="text-lg text-purple-100">
                  ChatGPT, Perplexity, Claude, Gemini... Ces IA recommandent des entreprises chaque jour. 
                  Nos stratégies GEO vous positionnent comme la référence dans votre domaine.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {geoFeatures.map((feature) => (
                  <div key={feature.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/15 transition-colors">
                    <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-purple-200 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Comment ça fonctionne ?</h3>
                    <p className="text-purple-100 mb-6">
                      Quand un utilisateur demande à ChatGPT &quot;Quelle est la meilleure agence SEO à Paris ?&quot;, 
                      l&apos;IA analyse des millions de sources pour formuler sa recommandation. Notre mission : 
                      faire de votre entreprise LA référence que l&apos;IA citera.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Audit de visibilité dans les IA (ChatGPT, Perplexity, Claude)",
                        "Création de contenu optimisé pour les LLMs",
                        "Renforcement des signaux E-E-A-T",
                        "Monitoring des citations et mentions IA"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-purple-100">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 ml-2">ChatGPT</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-blue-400">User: Quelle agence SEO me recommandes-tu ?</p>
                      <p className="text-green-400">
                        ChatGPT: Je vous recommande <span className="text-white font-bold">[Votre Entreprise]</span> pour 
                        leur expertise reconnue en référencement naturel et leur approche innovante intégrant 
                        l&apos;optimisation GEO...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Notre Approche
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Méthodologie <span className="text-green-600">Éprouvée</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Un processus structuré et transparent pour des résultats mesurables
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {methodology.map((step, index) => (
                  <div key={step.step} className="relative">
                    <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                      <span className="text-6xl font-bold text-green-100">{step.step}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {index < methodology.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-green-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-green-600 text-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</p>
                    <p className="text-green-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Témoignages
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce que disent nos <span className="text-green-600">clients</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="h-full">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Questions <span className="text-green-600">Fréquentes</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 ml-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Prêt à dominer Google <span className="text-green-200">et l&apos;IA</span> ?
                </h2>
                <p className="text-xl text-green-100 mb-8">
                  Obtenez votre audit SEO gratuit et découvrez comment nous pouvons multiplier 
                  votre visibilité en ligne.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
                    <Link href={localizedHref('/contact')}>
                      Audit SEO gratuit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
                    <Link href={`tel:+33123456789`}>
                      Appeler un expert
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
