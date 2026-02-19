import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Zap, Shield, Smartphone, PenTool, Search, CheckCircle, Layers, Rocket, Code } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
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
      ? 'Custom website and e-commerce creation, hand-coded from scratch. Responsive design, SEO optimization, guaranteed performance. Free quote in 24h.'
      : 'Création de sites web professionnels codés sur mesure de A à Z. Zéro template, zéro WordPress. Design responsive, SEO intégré, performances garanties. Devis gratuit en 24h.',
    keywords: ['création site web', 'agence web', 'développement site internet', 'site web professionnel', 'e-commerce', 'responsive design', 'SEO'],
    alternates: {
      canonical: `https://www.tech-trust.fr/${locale}/solutions/agence-web`,
      languages: {
        'fr': 'https://www.tech-trust.fr/fr/solutions/agence-web',
        'en': 'https://www.tech-trust.fr/en/solutions/agence-web',
        'x-default': 'https://www.tech-trust.fr/fr/solutions/agence-web',
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
    icon: Layers,
    title: "Site Vitrine",
    description: "Présentez votre entreprise avec élégance grâce à un site vitrine moderne, responsive et optimisé pour convertir vos visiteurs en clients.",
    features: ["Design sur mesure", "Responsive", "Optimisation SEO", "Intégration CMS"]
  },
  {
    icon: Rocket,
    title: "E-commerce",
    description: "Boutique en ligne performante avec une expérience d'achat fluide, des paiements sécurisés et une gestion simplifiée de vos produits.",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion des stocks", "Tunnel d'achat optimisé"]
  },
  {
    icon: Code,
    title: "Application Web",
    description: "Applications web personnalisées pour digitaliser vos processus métier et améliorer la productivité de vos équipes.",
    features: ["Développement sur mesure", "Intégration API", "Tableau de bord", "Sécurité avancée"]
  }
];

const projects = [
  {
    title: "Site E-commerce Joaillerie",
    client: "Christina France",
    tags: ["E-commerce", "Design de luxe", "SEO"],
    description: "Boutique en ligne premium avec configurateur de bijoux et système de paiement sécurisé."
  },
  {
    title: "Plateforme Événementielle",
    client: "Palais des Festivals",
    tags: ["Web App", "Billetterie", "Multilingue"],
    description: "Plateforme de gestion des événements avec système de réservation et d'accréditation en temps réel."
  },
  {
    title: "Site Vitrine Premium",
    client: "Groupe Chopard",
    tags: ["Site Vitrine", "Animation 3D", "Multi-marchés"],
    description: "Site vitrine de prestige avec expériences immersives et intégrations médias avancées."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Consultation & Briefing",
    description: "Nous prenons le temps de comprendre votre entreprise, vos objectifs et vos besoins spécifiques pour définir une vision claire du projet."
  },
  {
    number: "02",
    title: "Design & Maquettes",
    description: "Nos designers créent des maquettes interactives de votre site pour validation avant le développement."
  },
  {
    number: "03",
    title: "Développement",
    description: "Notre équipe de développeurs code votre site en respectant les standards web et les meilleures pratiques SEO."
  },
  {
    number: "04",
    title: "Tests & Optimisation",
    description: "Tests rigoureux sur tous les navigateurs et appareils pour garantir une expérience utilisateur parfaite."
  },
  {
    number: "05",
    title: "Lancement & Formation",
    description: "Mise en ligne et formation à l'utilisation de votre espace d'administration pour gérer votre site en toute autonomie."
  }
];

const testimonials = [
  {
    name: "Sophie Laurent",
    role: "Directrice Marketing, Palais des Festivals",
    content: "Techtrust a complètement transformé notre présence en ligne. Le site est non seulement magnifique mais aussi parfaitement fonctionnel et sécurisé. Un vrai partenariat de confiance !",
    rating: 5
  },
  {
    name: "Marc Dupont",
    role: "CEO, Christina France",
    content: "Notre boutique en ligne a dépassé toutes nos attentes. L'UX est fluide, le design reflète parfaitement l'élégance de notre marque et les ventes ont augmenté de 45% dès le premier mois.",
    rating: 5
  },
  {
    name: "Julie Moreau",
    role: "Fondatrice, Studio Design",
    content: "Je recommande vivement Techtrust pour leur professionnalisme et leur réactivité. Notre site est un véritable outil de conversion qui nous apporte chaque jour de nouveaux clients.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Quel est le délai moyen pour la création d'un site web ?",
    answer: "Les délais varient selon la complexité du projet. Un site vitrine peut être livré en 2-3 semaines, tandis qu'un e-commerce ou une application web sur mesure nécessite généralement 4 à 8 semaines. Nous établissons toujours un calendrier précis en début de projet."
  },
  {
    question: "Comment garantissez-vous la sécurité de mon site web ?",
    answer: "Nous appliquons les meilleures pratiques en matière de sécurité web : certificats SSL, protection contre les injections SQL, mises à jour régulières, sauvegardes automatiques, et conformité RGPD. Nous réalisons également des audits de sécurité réguliers."
  },
  {
    question: "Est-ce que je pourrai modifier moi-même le contenu de mon site ?",
    answer: "Absolument ! Tous nos sites sont livrés avec un système de gestion de contenu (CMS) intuitif qui vous permet de modifier textes, images et autres éléments facilement. Une formation complète est incluse dans nos prestations."
  },
  {
    question: "Comment optimisez-vous les sites pour le référencement naturel ?",
    answer: "Notre approche SEO est intégrée dès la conception : structure technique optimisée, vitesse de chargement, responsive design, balisage sémantique, méta-données optimisées, et intégration de Schema.org. Nous fournissons également des conseils pour votre stratégie de contenu."
  },
  {
    question: "Proposez-vous un service de maintenance après la mise en ligne ?",
    answer: "Oui, nous proposons différentes formules de maintenance incluant les mises à jour de sécurité, sauvegardes régulières, corrections de bugs, et support technique. Vous pouvez ainsi vous concentrer sur votre cœur de métier en toute sérénité."
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
            "areaServed": {
              "@type": "Country",
              "name": "France"
            },
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
            }
          })
        }}
      />

      {/* FAQPage Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main className="flex-1 pt-20">
          <Breadcrumbs 
            locale={locale} 
            items={[
              { label: 'Solutions', href: `/${locale}/solutions` },
              { label: 'Création Site Web' }
            ]} 
          />
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white to-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 text-sm font-medium text-blue-600 mb-6">
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    100% codé sur mesure — Zéro template
                  </span>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                    Création de <span className="text-blue-600">Sites Web</span> 
                    <br />
                    <span className="text-blue-600">Professionnels</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Transformez votre présence en ligne avec un site web moderne, performant et optimisé pour le référencement. E-commerce, site vitrine ou application web sur mesure, nous concrétisons votre vision.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href={localizedHref('/contact')}>
                        Demander un devis gratuit
                        <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Link href={localizedHref('/pricing')}>
                        Voir nos tarifs
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                      <span>Next.js, React, TypeScript — code artisanal de A à Z</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="h-8 bg-blue-600 rounded-md w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                        <div className="h-32 bg-gray-100 rounded-md w-full"></div>
                        <div className="flex gap-2">
                          <div className="h-10 bg-blue-600 rounded-md w-32"></div>
                          <div className="h-10 bg-gray-200 rounded-md w-32"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-6 -right-6 bg-green-500 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                      SEO Optimisé
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                      Mobile-First
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
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">Notre Expertise</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-blue-600">Services</span> Web
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions web personnalisées pour répondre à tous vos objectifs business
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button asChild variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 mt-auto">
                      <Link href={localizedHref('/contact')}>
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        

          {/* Projects Section */}
          {/* <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">Nos Réalisations</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-600">Projets</span> Récents
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez quelques-uns de nos projets web les plus récents
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.title} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="w-full h-56 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-blue-600 text-center px-4">{project.title}</div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-blue-600 font-medium mb-3">Client: {project.client}</p>
                      <p className="text-gray-600 mb-6">{project.description}</p>
                      
                      <Link href={localizedHref('/contact')} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group/btn">
                        Voir le projet
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link href={localizedHref('/contact')}>
                    Découvrir plus de projets
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </section> */}

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">Pourquoi nous choisir</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Des Sites Web <span className="text-blue-600">Performants</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Une expertise technique et créative pour maximiser l'impact de votre présence digitale
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Process Section */}
          <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-800 to-blue-700 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Notre <span className="text-white">Processus</span> de Création
                </h2>
                <p className="text-lg text-gray-300">
                  Une méthodologie éprouvée pour des résultats à la hauteur de vos attentes
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {processSteps.map((step, index) => (
                  <div key={step.number} className="flex gap-6 mb-12 last:mb-0">
                    <div className="w-16 h-16 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          {/* <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">Ils témoignent</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce que nos <span className="text-blue-600">Clients</span> disent
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez les retours de nos clients sur nos services de création web
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic mb-6">&quot;{testimonial.content}&quot;</p>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Pourquoi PAS de WordPress / Wix */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-16">
                <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">Notre position</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Pourquoi on <span className="text-red-600">refuse</span> WordPress et Wix
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Ce n&apos;est pas du snobisme. C&apos;est un choix technique réfléchi pour offrir le meilleur à nos clients.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">WordPress : 43% du web... et 90% des sites piratés</h3>
                  <p className="text-gray-600 leading-relaxed">
                    WordPress est populaire, mais sa popularité en fait la cible n°1 des hackers. 
                    Chaque plugin est un risque de sécurité. Les mises à jour cassent régulièrement les sites. 
                    Et les performances ? Un site WordPress moyen charge en 3-5 secondes — Google pénalise tout ce qui dépasse 2,5s.
                    Notre code sur mesure élimine ces problèmes à la racine.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Wix / Squarespace : rapide à créer, impossible à optimiser</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ces plateformes sont parfaites pour un blog personnel. Mais pour une entreprise qui veut être visible sur Google ? 
                    Le SEO est limité par la plateforme, les performances sont médiocres, le code est obfusqué et vous ne possédez rien. 
                    Le jour où vous voulez partir, vous repartez de zéro.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-8 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Notre code sur mesure : la seule solution qui se démarque</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Avec Next.js et React, votre site charge en moins de 1,5 seconde, le SEO est intégré nativement dans chaque page, 
                    la sécurité est maximale sans plugins tiers, et le design est 100% unique. Vous êtes propriétaire du code, 
                    libre de l&apos;héberger où vous voulez, et votre site évolue avec votre entreprise sans aucune limite.
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                <p className="text-2xl font-bold mb-2">Le résultat ?</p>
                <p className="text-lg text-gray-200">
                  Des sites plus rapides, mieux référencés, plus sécurisés et 100% uniques. 
                  C&apos;est ça, la différence Techtrust.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Questions <span className="text-blue-600">Fréquentes</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Prêt à lancer votre projet web ?
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Contactez-nous dès aujourd&apos;hui pour un devis gratuit et sans engagement. Transformez votre vision en réalité numérique !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Link href={localizedHref('/contact')}>
                      Demander un devis gratuit
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600">
                    <Link href={localizedHref('/pricing')}>
                      Voir nos formules
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <RelatedServices currentSlug="agence-web" locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
