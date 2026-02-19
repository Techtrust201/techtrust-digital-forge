import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Users, Globe, Zap, Target, Shield, Heart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'À propos de Techtrust — Agence Web & Growth Hacking IA',
    description: 'Découvrez Techtrust, agence digitale française fondée en 2024 à Mougins. Création de sites web sur mesure, SEO, growth hacking IA. 30+ projets livrés en PACA et toute la France.',
    keywords: ['à propos', 'agence web', 'techtrust', 'équipe', 'mission', 'valeurs', 'growth hacking IA', 'agence digitale France'],
    openGraph: {
      type: 'website',
      title: 'À propos de Techtrust — Agence Web & Growth Hacking IA',
      description: 'Découvrez Techtrust, agence digitale française fondée en 2024 à Mougins. 30+ projets livrés, création web sur mesure, SEO et growth hacking IA.',
      url: `https://www.tech-trust.fr/${locale}/a-propos`,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/a-propos`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/a-propos',
        'en': 'https://www.tech-trust.fr/en/a-propos',
        'x-default': 'https://www.tech-trust.fr/fr/a-propos',
      },
    },
  };
}

const stats = [
  { value: '30+', label: 'Projets livrés', icon: Globe },
  { value: '25+', label: 'Clients accompagnés', icon: Users },
  { value: '100%', label: 'Code sur mesure', icon: Heart },
  { value: '24h', label: 'Temps de réponse', icon: Zap },
];

const values = [
  {
    icon: Target,
    title: 'Excellence technique',
    description: 'Nous utilisons les technologies les plus modernes — Next.js, React, TypeScript, Tailwind CSS — pour garantir des performances optimales et un code maintenable. Chaque projet est optimisé SEO dès la conception.'
  },
  {
    icon: TrendingUp,
    title: 'Résultats mesurables',
    description: 'Nous ne croyons pas aux promesses vagues. Chaque action est mesurée, chaque investissement est justifié par des données concrètes. Notre approche data-driven garantit un ROI positif pour chaque client.'
  },
  {
    icon: Shield,
    title: 'Transparence totale',
    description: 'Tarifs clairs, délais réalistes, reporting régulier. Vous savez exactement où va votre investissement et quels résultats il génère. Pas de mauvaise surprise, pas de coûts cachés.'
  },
  {
    icon: Heart,
    title: 'Accompagnement humain',
    description: 'Derrière la technologie, il y a des humains passionnés. Un interlocuteur dédié, un support réactif et une vraie relation de confiance. Votre succès est notre priorité.'
  },
];

const team = [
  {
    name: 'Hugo',
    role: 'Fondateur & CEO',
    expertise: 'Stratégie digitale, Growth Hacking IA, Développement web',
    description: 'Passionné par l\'innovation digitale et l\'intelligence artificielle, Hugo a fondé Techtrust avec la conviction que chaque entreprise mérite une présence en ligne performante. Expert en Next.js, React et stratégies de croissance IA.'
  },
  {
    name: 'Équipe Développement',
    role: 'Développeurs Full-Stack',
    expertise: 'Next.js, React, TypeScript, Node.js, Supabase',
    description: 'Notre équipe de développeurs experts maîtrise les technologies modernes du web. Chaque projet bénéficie d\'une architecture solide, d\'un code propre et de performances optimales.'
  },
  {
    name: 'Équipe Marketing',
    role: 'Experts SEO, SEA & Growth',
    expertise: 'SEO, Google Ads, Growth Hacking, Community Management',
    description: 'Nos experts marketing combinent stratégie, créativité et intelligence artificielle pour maximiser votre visibilité en ligne et générer des leads qualifiés.'
  },
  {
    name: 'Équipe Design',
    role: 'UX/UI Designers',
    expertise: 'Web Design, UX Research, Prototypage, Brand Identity',
    description: 'Nos designers créent des interfaces qui impressionnent visuellement et convertissent efficacement. Chaque design est pensé mobile-first et optimisé pour l\'accessibilité.'
  },
];

const milestones = [
  { year: '2024', title: 'Création de Techtrust à Mougins', description: 'Lancement de l\'agence avec une conviction forte : coder chaque site de A à Z, sans template ni WordPress. Les premiers clients de la Côte d\'Azur nous font confiance.' },
  { year: '2024', title: 'Premiers grands comptes', description: 'Palais des Festivals de Cannes, Chopard, cabinets d\'avocats... Techtrust s\'impose comme partenaire digital des entreprises exigeantes en PACA.' },
  { year: '2024', title: 'Lancement du Growth Hacking IA', description: 'Intégration de l\'intelligence artificielle dans nos stratégies d\'acquisition client. Automatisation de la prospection et du community management.' },
  { year: '2025', title: 'Partenariat Arodata & expansion', description: 'Alliance stratégique avec Arodata pour un pôle informatique complet à Mougins. Plus de 25 clients accompagnés et 30+ projets livrés.' },
  { year: '2026', title: 'Pionnier du GEO en France', description: 'Techtrust devient l\'une des premières agences françaises à proposer le Generative Engine Optimization (GEO) pour la visibilité sur ChatGPT, Perplexity et Google AI.' },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      {/* AboutPage + Organization Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "À propos de Techtrust",
            "description": "Découvrez Techtrust, agence digitale française spécialisée en création web, growth hacking IA et référencement SEO/SEA/GEO.",
            "url": `https://www.tech-trust.fr/${locale}/a-propos`,
            "mainEntity": {
              "@type": "Organization",
              "name": "Techtrust",
              "url": "https://www.tech-trust.fr",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "Hugo",
                "jobTitle": "Fondateur & CEO",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Techtrust"
                }
              },
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 5,
                "maxValue": 15
              },
              "knowsAbout": [
                "Création de sites web",
                "Growth Hacking IA",
                "SEO",
                "SEA",
                "GEO",
                "Community Management",
                "Next.js",
                "React",
                "TypeScript",
                "Intelligence Artificielle"
              ],
              "slogan": "Transformez votre business avec l'IA",
              "areaServed": {
                "@type": "Country",
                "name": "France"
              }
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />

        <main className="flex-1 pt-20">
          <Breadcrumbs
            locale={locale}
            items={[{ label: 'À propos' }]}
          />

          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-4xl mx-auto">
                <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-semibold px-4 py-2 rounded-full mb-6">
                  Notre histoire
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  L&apos;agence digitale qui <span className="bg-gradient-to-r from-custom-blue to-custom-purple bg-clip-text text-transparent">transforme votre business</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Fondée en 2024, Techtrust est née d&apos;une conviction : chaque entreprise, quelle que soit sa taille, 
                  mérite une présence en ligne exceptionnelle. Nous combinons expertise technique de pointe et intelligence 
                  artificielle pour propulser la croissance de nos clients.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                      <stat.icon className="w-8 h-8 text-custom-blue mx-auto mb-3" aria-hidden="true" />
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Notre mission : démocratiser l&apos;excellence digitale
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Trop d&apos;entreprises françaises sont freinées par des solutions digitales médiocres : sites web lents, 
                    référencement inexistant, stratégies marketing inefficaces. Chez Techtrust, nous avons décidé de changer cela.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Notre approche combine les <strong>technologies les plus modernes</strong> (Next.js, React, TypeScript) avec 
                    l&apos;<strong>intelligence artificielle</strong> pour offrir des résultats autrefois réservés aux grandes entreprises. 
                    Un site vitrine professionnel à partir de 1 500€, un growth hacking automatisé par IA, un référencement SEO/SEA/GEO complet.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    En 2026, nous sommes fiers d&apos;être parmi les <strong>premières agences françaises à proposer le GEO</strong> (Generative Engine Optimization), 
                    permettant à nos clients d&apos;être cités par ChatGPT, Perplexity et Google AI Overviews en plus des résultats de recherche classiques.
                  </p>
                  <div className="space-y-3">
                    {['Sites web rapides, accessibles et optimisés SEO', 'Growth hacking automatisé par intelligence artificielle', 'Référencement SEO + SEA + GEO pour une visibilité maximale', 'Support réactif avec réponse garantie sous 24h'].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-custom-blue to-custom-purple rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Pourquoi choisir Techtrust ?</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="font-semibold mb-1">Technologies de pointe</p>
                      <p className="text-sm text-gray-200">Next.js 15, React 18, TypeScript, Tailwind CSS, Supabase — les mêmes technologies utilisées par Netflix, Vercel et Twitch.</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="font-semibold mb-1">IA intégrée partout</p>
                      <p className="text-sm text-gray-200">Prospection automatisée, community management IA, analytics prédictif — l&apos;IA au service de votre croissance.</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="font-semibold mb-1">Résultats prouvés</p>
                      <p className="text-sm text-gray-200">+300% de trafic organique moyen, des leads qualifiés et un accompagnement de A à Z.</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="font-semibold mb-1">Couverture nationale</p>
                      <p className="text-sm text-gray-200">Mougins, Cannes, Nice, Antibes, Grasse, Marseille, Aix-en-Provence, Paris, Lyon et toute la France.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Ces principes guident chaque décision, chaque projet, chaque interaction avec nos clients.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value) => (
                  <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <value.icon className="w-10 h-10 text-custom-blue mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Notre équipe</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Des experts passionnés qui combinent créativité, expertise technique et intelligence artificielle.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {team.map((member) => (
                  <div key={member.name} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-custom-blue to-custom-purple rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-custom-blue font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-500 mb-3">{member.expertise}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline / Milestones */}
          <section className="py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Notre parcours</h2>
                <p className="text-xl text-gray-600">De la création à l&apos;innovation continue.</p>
              </div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-custom-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && <div className="w-0.5 h-full bg-custom-blue/20 mt-2" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-bold text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Notre approche technique */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block bg-blue-50 text-custom-blue text-sm font-semibold px-4 py-2 rounded-full mb-4">
                  Notre approche technique
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Pourquoi le code sur mesure ?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Chaque projet Techtrust est développé de A à Z avec les technologies les plus performantes du marché. 
                  Voici les avantages concrets pour votre entreprise.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-custom-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-custom-blue" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Performance maximale</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Chaque ligne de code est optimisée. Résultat : des temps de chargement sous 1,5 seconde et 
                    un score PageSpeed 95+ qui plaît autant aux visiteurs qu&apos;à Google.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">SEO technique natif</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Rendu serveur (SSR/SSG), métadonnées structurées, lazy loading, Core Web Vitals optimisés... 
                    Le référencement est intégré dans l&apos;architecture même de votre site.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-purple-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Sécurité renforcée</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Aucune dépendance à des plugins tiers, pas de base de données exposée. 
                    Un code minimal et auditable qui réduit considérablement la surface d&apos;attaque.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-yellow-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Design 100% unique</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Votre site ne ressemble à aucun autre. Chaque interface est conçue et développée spécifiquement 
                    pour votre marque, vos utilisateurs et vos objectifs.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Propriété totale du code</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vous êtes propriétaire à 100% du code source. Aucune dépendance à un éditeur, aucun abonnement obligatoire. 
                    Votre site vous appartient entièrement.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Évolutivité sans limite</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nouvelles fonctionnalités, intégrations API, montée en charge — le code sur mesure s&apos;adapte 
                    à toutes vos évolutions sans jamais vous limiter.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Partenaire Arodata */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <span className="inline-block bg-custom-blue/10 text-custom-blue text-sm font-semibold px-3 py-1 rounded-full mb-4">
                      Partenaire stratégique
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Techtrust &times; Arodata
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Techtrust et <a href="https://www.arodata.fr" target="_blank" rel="noopener noreferrer" className="text-custom-blue font-semibold hover:underline">Arodata</a> forment 
                      un pôle informatique complet basé à Mougins. Là où Techtrust excelle en création web, SEO et growth hacking, 
                      Arodata apporte son expertise en infrastructure réseau, téléphonie IP, dépannage et infogérance.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Ensemble, nous offrons un accompagnement digital et informatique de A à Z aux entreprises de la Côte d&apos;Azur et de toute la France.
                    </p>
                    <a
                      href="https://www.arodata.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-custom-blue font-semibold hover:text-custom-purple transition-colors"
                    >
                      Découvrir Arodata
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <p className="text-3xl font-bold text-custom-blue">Arodata</p>
                    <p className="text-sm text-gray-500 mt-1">Réseau &bull; Infogérance &bull; Téléphonie</p>
                    <p className="text-xs text-gray-400 mt-2">62 Imp. Font-Roubert, Mougins</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-20 bg-gradient-to-r from-custom-blue to-custom-purple">
            <div className="container mx-auto px-4 max-w-4xl text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à transformer votre business ?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Rejoignez nos clients (Palais des Festivals, Chopard, et bien d&apos;autres) qui font confiance à Techtrust. 
                Contactez-nous pour un audit gratuit de votre présence digitale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-custom-blue hover:bg-gray-100">
                  <Link href={localizedHref('/contact')}>
                    Demander un audit gratuit
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Link href={localizedHref('/solutions')}>
                    Découvrir nos solutions
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
