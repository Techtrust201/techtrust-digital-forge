import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  Users, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  BarChart3, 
  CheckCircle,
  TrendingUp,
  Heart,
  Share2,
  Star,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-static';

interface CommunityManagementPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CommunityManagementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  return {
    title: isEn 
      ? 'Community Management | Social Media Management - Techtrust'
      : 'Community Management | Gestion Réseaux Sociaux - Techtrust',
    description: isEn
      ? 'Expert community management! Social media management, content creation, audience engagement. +150% engagement guaranteed. Free quote!'
      : 'Community management expert ! Gestion réseaux sociaux, création contenu, engagement audience. +150% d\'engagement garanti. Devis gratuit !',
    keywords: ['community management', 'réseaux sociaux', 'social media', 'Instagram', 'LinkedIn', 'création de contenu', 'engagement audience', 'stratégie sociale', 'TikTok', 'Facebook'],
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
    icon: MessageCircle,
    title: "Création de Contenu",
    description: "Contenus créatifs et engageants adaptés à chaque plateforme sociale. Posts, stories, reels, vidéos et infographies.",
    color: "pink"
  },
  {
    icon: Users,
    title: "Gestion Communauté",
    description: "Animation et modération de votre communauté pour maximiser l'engagement et créer un lien fort avec votre audience.",
    color: "purple"
  },
  {
    icon: TrendingUp,
    title: "Stratégie Sociale",
    description: "Stratégies personnalisées pour chaque réseau social alignées sur vos objectifs business et votre identité de marque.",
    color: "blue"
  },
  {
    icon: Heart,
    title: "Engagement Audience",
    description: "Techniques éprouvées pour booster l'interaction, fidéliser votre audience et transformer vos followers en ambassadeurs.",
    color: "red"
  },
  {
    icon: Share2,
    title: "Campagnes Virales",
    description: "Création de campagnes créatives pour maximiser la portée et la viralité de vos contenus.",
    color: "green"
  },
  {
    icon: Star,
    title: "Influence Marketing",
    description: "Collaboration avec des influenceurs pertinents pour amplifier votre message et toucher de nouvelles audiences.",
    color: "yellow"
  }
];

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    description: "Posts, stories, reels et stratégie de croissance pour développer votre présence visuelle.",
    color: "from-pink-500 to-purple-600"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    description: "Positionnement B2B, thought leadership et networking professionnel pour votre entreprise.",
    color: "from-blue-600 to-blue-700"
  },
  {
    name: "TikTok",
    icon: Sparkles,
    description: "Création de contenus viraux et tendances pour toucher la génération Z et les millennials.",
    color: "from-gray-900 to-gray-800"
  },
  {
    name: "Facebook",
    icon: Users,
    description: "Gestion de page, groupes communautaires et campagnes publicitaires ciblées.",
    color: "from-blue-500 to-blue-600"
  }
];

const stats = [
  { value: "+150%", label: "Engagement moyen" },
  { value: "10M+", label: "Followers gérés" },
  { value: "500+", label: "Comptes gérés" },
  { value: "98%", label: "Clients satisfaits" }
];

const process = [
  {
    step: "01",
    title: "Audit & Stratégie",
    description: "Analyse de votre présence actuelle, étude de la concurrence et définition d'une stratégie sur mesure."
  },
  {
    step: "02",
    title: "Création de Contenu",
    description: "Production de contenus originaux et engageants adaptés à chaque plateforme et à votre audience."
  },
  {
    step: "03",
    title: "Publication & Animation",
    description: "Planification et publication régulière, interaction avec votre communauté et modération."
  },
  {
    step: "04",
    title: "Reporting & Optimisation",
    description: "Analyse des performances, rapports mensuels et ajustements continus pour maximiser les résultats."
  }
];

const testimonials = [
  {
    name: "Marie Dupont",
    role: "CEO, FashionBrand",
    content: "Notre communauté Instagram a triplé en 6 mois grâce à Techtrust. L'engagement est au rendez-vous !",
    rating: 5
  },
  {
    name: "Lucas Martin",
    role: "Directeur Marketing, TechStartup",
    content: "Une équipe réactive et créative. Nos réseaux sociaux sont enfin à la hauteur de notre marque.",
    rating: 5
  },
  {
    name: "Sophie Bernard",
    role: "Fondatrice, BioCosmetics",
    content: "Le ROI est impressionnant. Nos ventes via les réseaux sociaux ont augmenté de 80%.",
    rating: 5
  }
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
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-2 text-sm font-medium text-pink-600 mb-6">
                  <Users className="w-4 h-4" />
                  +10M de followers gérés
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Community
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Management</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Développez votre présence sur les réseaux sociaux et créez une communauté engagée autour de votre marque. 
                  Nous gérons vos réseaux sociaux comme des pros !
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                    <Link href={localizedHref('/contact')}>
                      Audit gratuit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-pink-600 text-pink-600 hover:bg-pink-50">
                    <Link href="#services">
                      Voir nos services
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl lg:text-3xl font-bold text-pink-600">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Nos Services
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Services <span className="text-pink-600">Community Management</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Une offre complète pour développer et animer votre présence sur les réseaux sociaux
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Notre <span className="text-pink-200">Méthodologie</span>
                </h2>
                <p className="text-lg text-pink-100">
                  Un processus éprouvé pour maximiser votre présence sur les réseaux sociaux
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((step) => (
                  <div key={step.step} className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/15 transition-colors">
                    <span className="text-5xl font-bold text-white/30">{step.step}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-pink-100 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Platforms Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Plateformes
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nous gérons <span className="text-pink-600">tous vos réseaux</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platforms.map((platform) => (
                  <Card key={platform.name} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`bg-gradient-to-br ${platform.color} p-6 text-white`}>
                      <platform.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold">{platform.name}</h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 text-sm">{platform.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          {/* <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Témoignages
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce que disent nos <span className="text-pink-600">clients</span>
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
          </section> */}

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Développez votre présence sociale
                </h2>
                <p className="text-xl text-pink-100 mb-8">
                  Contactez-nous pour un audit gratuit de votre présence sur les réseaux sociaux 
                  et découvrez comment booster votre engagement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                    <Link href={localizedHref('/contact')}>
                      Demander mon audit gratuit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
                    <Link href={localizedHref('/pricing')}>
                      Voir nos formules
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
