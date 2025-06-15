import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Zap, Award, Rocket, Layers, Code, Settings, Search, Smartphone, PenTool, ShieldCheck } from 'lucide-react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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
    icon: ShieldCheck,
    title: "Sécurité avancée",
    description: "Protection contre les cyber-menaces et conformité RGPD pour sécuriser vos données."
  },
  {
    icon: Settings,
    title: "Maintenance incluse",
    description: "Maintenance technique, mises à jour régulières et support réactif inclus dans nos services."
  }
];

const projects = [
  {
    title: "Site E-commerce Joaillerie",
    client: "Christina France",
    image: "/projects/ecommerce-jewelry.jpg",
    tags: ["E-commerce", "Design de luxe", "SEO"],
    description: "Boutique en ligne premium avec configurateur de bijoux et système de paiement sécurisé."
  },
  {
    title: "Plateforme Événementielle",
    client: "Palais des Festivals",
    image: "/projects/event-platform.jpg",
    tags: ["Web App", "Billetterie", "Multilingue"],
    description: "Plateforme de gestion des événements avec système de réservation et d'accréditation en temps réel."
  },
  {
    title: "Site Vitrine Premium",
    client: "Groupe Chopard",
    image: "/projects/showcase-luxe.jpg",
    tags: ["Site Vitrine", "Animation 3D", "Multi-marchés"],
    description: "Site vitrine de prestige avec expériences immersives et intégrations médias avancées."
  }
];

const AgenceWeb = () => {
  const fadeIn = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };
  
  return (
    <>
      <Helmet>
        <title>Création de Sites Web Professionnels | Agence Web Techtrust</title>
        <meta name="description" content="Création de sites web professionnels et e-commerce sur mesure. Design responsive, optimisation SEO, performances techniques garanties. 500+ sites créés, devis gratuit en 24h." />
        <meta name="keywords" content="création site web, agence web, développement site internet, site web professionnel, e-commerce, boutique en ligne, site vitrine, responsive design, référencement naturel, SEO, développement web, UX/UI design, site sur mesure" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tech-trust.fr/solutions/agence-web" />
        <meta property="og:title" content="Création de Sites Web Professionnels | Agence Web Techtrust" />
        <meta property="og:description" content="Sites web professionnels et e-commerce sur mesure. Design responsive, optimisation SEO, performances techniques garanties. 500+ sites créés, devis gratuit en 24h." />
        <meta property="og:image" content="https://www.tech-trust.fr/solutions/agence-web/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tech-trust.fr/solutions/agence-web" />
        <meta property="twitter:title" content="Création de Sites Web Professionnels | Agence Web Techtrust" />
        <meta property="twitter:description" content="Sites web professionnels et e-commerce sur mesure. Design responsive, optimisation SEO, performances techniques garanties. 500+ sites créés, devis gratuit en 24h." />
        <meta property="twitter:image" content="https://www.tech-trust.fr/solutions/agence-web/og-image.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.tech-trust.fr/solutions/agence-web" />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="fr" href="https://www.tech-trust.fr/fr/solutions/agence-web" />
        <link rel="alternate" hrefLang="en" href="https://www.tech-trust.fr/en/solutions/agence-web" />
        <link rel="alternate" hrefLang="x-default" href="https://www.tech-trust.fr/solutions/agence-web" />

        {/* Schema.org données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
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
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site vitrine professionnel",
                    "description": "Création de site web vitrine design et moderne pour présenter votre activité"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce sur mesure",
                    "description": "Développement de boutique en ligne personnalisée avec système de paiement sécurisé"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Application web métier",
                    "description": "Conception d'application web spécifique à votre activité pour optimiser vos processus"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <header>
          <NavbarPublic />
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white to-custom-slate/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-custom-blue/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <motion.span 
                    {...fadeIn} 
                    className="inline-flex items-center gap-2 bg-custom-blue/10 rounded-full px-4 py-2 text-sm font-medium text-custom-blue mb-6"
                  >
                    <Globe className="w-4 h-4" />
                    500+ sites web créés
                  </motion.span>
                  
                  <motion.h1 
                    {...fadeIn} 
                    transition={{ delay: 0.1 }}
                    className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                  >
                    Création de <span className="text-custom-blue">Sites Web</span> 
                    <br />
                    <span className="text-custom-green">
                      Professionnels
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    {...fadeIn}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 mb-8"
                  >
                    Transformez votre présence en ligne avec un site web moderne, performant et optimisé pour le référencement. E-commerce, site vitrine ou application web sur mesure, nous concrétisons votre vision.
                  </motion.p>
                  
                  <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-custom-blue hover:bg-custom-blue/90 text-white"
                    >
                      <a href="/contact">
                        Demander un devis gratuit
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                    
                    <Button 
                      asChild
                      variant="outline" 
                      size="lg"
                      className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue/10"
                    >
                      <a href="/pricing">
                        Voir nos tarifs
                      </a>
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-6 mt-8"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">4.9/5 (127 avis clients)</span>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="order-1 lg:order-2"
                >
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="h-8 bg-custom-blue rounded-md w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                        <div className="h-32 bg-gray-100 rounded-md w-full"></div>
                        <div className="flex gap-2">
                          <div className="h-10 bg-custom-blue rounded-md w-32"></div>
                          <div className="h-10 bg-gray-200 rounded-md w-32"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Éléments flottants */}
                    <div className="absolute -top-6 -right-6 bg-green-500 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                      SEO Optimisé
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-custom-purple text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                      Mobile-First
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-custom-blue/10 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4">Notre Expertise</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos <span className="text-custom-blue">Services</span> Web
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions web personnalisées pour répondre à tous vos objectifs business
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
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
                ].map((service, index) => (
                  <motion.div 
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-custom-blue to-custom-blue/70 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild
                      variant="outline"
                      className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue/10 mt-auto"
                    >
                      <a href="/contact">
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-custom-blue/10 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4">Pourquoi nous choisir</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Des Sites Web <span className="text-custom-blue">Performants</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Une expertise technique et créative pour maximiser l'impact de votre présence digitale
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-custom-blue/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-custom-blue" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-custom-blue/10 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4">Nos Réalisations</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-custom-blue">Projets</span> Récents
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez quelques-uns de nos projets web les plus récents
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image placeholder */}
                    <div className="w-full h-56 bg-gradient-to-r from-custom-blue/20 to-custom-green/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-custom-blue/50">{project.title}</div>
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
                      <p className="text-custom-blue font-medium mb-3">Client: {project.client}</p>
                      <p className="text-gray-600 mb-6">{project.description}</p>
                      
                      <Button 
                        asChild
                        variant="ghost"
                        className="text-custom-blue hover:bg-custom-blue/10 p-0 group/btn"
                      >
                        <a href="/contact" className="flex items-center">
                          Voir le projet
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  asChild
                  variant="outline"
                  className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue/10"
                >
                  <a href="/contact">
                    Découvrir plus de projets
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-gray-900 via-custom-blue/90 to-custom-blue/80 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Notre <span className="text-custom-green">Processus</span> de Création
                </h2>
                <p className="text-lg text-gray-300">
                  Une méthodologie éprouvée pour des résultats à la hauteur de vos attentes
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {[
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
                ].map((step, index) => (
                  <motion.div 
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 mb-12 last:mb-0"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-custom-blue/10 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4">Ils témoignent</span>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce que nos <span className="text-custom-blue">Clients</span> disent
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez les retours de nos clients sur nos services de création web
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
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
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-custom-blue to-custom-purple text-white flex items-center justify-center font-bold mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Questions <span className="text-custom-blue">Fréquentes</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  {[
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
                  ].map((faq, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-custom-blue text-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Prêt à lancer votre projet web ?
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement. Transformez votre vision en réalité numérique !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-white text-custom-blue hover:bg-white/90"
                  >
                    <a href="/contact">
                      Demander un devis gratuit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <a href="/pricing">
                      Voir nos formules
                    </a>
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
};

export default AgenceWeb;
