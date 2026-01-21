
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Users, Zap, BarChart3, Rocket, Bot, Brain, Sparkles, CheckCircle, MessageSquare } from 'lucide-react';

const GrowthHacking = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Growth Hacking propulsé par l'IA",
    "description": "Services de growth hacking automatisés avec intelligence artificielle pour booster la croissance de votre entreprise avec des stratégies digitales innovantes",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <SEO
        title="Growth Hacking IA | Stratégies de Croissance Digitale Automatisées - Techtrust"
        description="🚀 Growth hacking révolutionnaire avec IA! Acquisition clients automatisée, marketing prédictif, chatbots intelligents. Remplacez vos commerciaux par l'intelligence artificielle. +300% de croissance garantie!"
        keywords="growth hacking IA, marketing automation, acquisition client automatisée, IA marketing, chatbot intelligent, prédiction client, lead automatique, remplacement commercial par IA, stratégies growth IA"
        canonicalUrl="https://www.tech-trust.fr/solutions/growth-hacking"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-4 py-2 text-sm font-medium text-purple-600 mb-6">
                  <Bot className="w-4 h-4" />
                  Propulsé par l'Intelligence Artificielle
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-purple-600">Growth Hacking</span> avec IA
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Marketing Automatisé</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Remplacez vos commerciaux et community managers par notre <strong>IA ultra-performante</strong>. 
                  Acquisition clients, prospection et engagement entièrement <strong>automatisés</strong>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <a href="/contact" className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Démo Gratuite
                    </a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Voir nos résultats
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+300%</div>
                    <div className="text-gray-600">Croissance moyenne</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">-70%</div>
                    <div className="text-gray-600">Coûts d'acquisition</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                    <div className="text-gray-600">Prospection automatique</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* IA Features Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  L'IA qui <span className="text-purple-600">Remplace</span> vos Commerciaux
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Notre technologie d'intelligence artificielle révolutionne votre acquisition client, 
                  votre community management et votre marketing digital.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-md">
                  <div className="bg-white rounded-xl h-16 w-16 flex items-center justify-center mb-6">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Acquisition Client Automatisée</h3>
                  <p className="text-gray-700 mb-6">
                    Notre IA identifie et engage automatiquement vos prospects idéaux sur LinkedIn, email et autres canaux.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Détection prédictive des leads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Séquences multi-canaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Personnalisation à grande échelle</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-md">
                  <div className="bg-white rounded-xl h-16 w-16 flex items-center justify-center mb-6">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Management IA</h3>
                  <p className="text-gray-700 mb-6">
                    Gérez vos réseaux sociaux sans effort grâce à notre IA qui crée, planifie et publie du contenu engageant.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Création automatique de contenu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Engagement proactif avec l'audience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Analyse de performance intégrée</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-md">
                  <div className="bg-white rounded-xl h-16 w-16 flex items-center justify-center mb-6">
                    <Sparkles className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Prédictif</h3>
                  <p className="text-gray-700 mb-6">
                    Anticipez les besoins de vos clients et optimisez vos campagnes avec notre IA prédictive avancée.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Segmentation client intelligente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Optimisation A/B automatique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Recommandations de produits IA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Notre Suite d'Outils <span className="text-purple-600">Growth IA</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Une plateforme complète pour automatiser et optimiser toutes vos stratégies d'acquisition et de fidélisation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "ProspectAI",
                    description: "Système d'acquisition client automatisé capable d'identifier et d'engager vos prospects idéaux à grande échelle."
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "ConvertBot",
                    description: "Chatbots intelligents qui qualifient vos leads et les convertissent en clients 24h/24, 7j/7."
                  },
                  {
                    icon: <MessageSquare className="w-8 h-8" />,
                    title: "SocialGenius",
                    description: "Plateforme de community management automatisé qui crée, publie et engage avec votre audience sur tous les réseaux."
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "EmailMaster",
                    description: "Système d'email marketing IA qui personnalise chaque message et optimise les taux d'ouverture et de clic."
                  },
                  {
                    icon: <BarChart3 className="w-8 h-8" />,
                    title: "AnalyticsAI",
                    description: "Dashboard intelligent qui analyse vos données marketing et fournit des recommandations d'optimisation."
                  },
                  {
                    icon: <Rocket className="w-8 h-8" />,
                    title: "RetentionPro",
                    description: "Suite d'outils d'engagement client pour maximiser la fidélisation et augmenter la valeur vie client."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="text-purple-600 mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Comment <span className="text-purple-600">Ça Fonctionne</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Une solution simple à déployer et à utiliser, qui s'adapte à votre business en quelques clics
                  </p>
                </div>

                <div className="space-y-20">
                  {[
                    {
                      step: "1",
                      title: "Intégration de vos données",
                      description: "Connectez vos outils existants (CRM, réseaux sociaux, analytics) à notre plateforme en quelques clics.",
                      image: "/placeholder.svg"
                    },
                    {
                      step: "2",
                      title: "Configuration de votre stratégie",
                      description: "Notre IA analyse votre marché et vous propose les stratégies optimales pour votre secteur.",
                      image: "/placeholder.svg"
                    },
                    {
                      step: "3",
                      title: "Automatisation complète",
                      description: "Les campagnes se lancent automatiquement et s'optimisent en continu grâce à l'apprentissage machine.",
                      image: "/placeholder.svg"
                    },
                    {
                      step: "4",
                      title: "Analyse et optimisation",
                      description: "Suivez vos performances en temps réel et recevez des recommandations d'amélioration de notre IA.",
                      image: "/placeholder.svg"
                    }
                  ].map((step, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                      <div className="flex-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-lg text-gray-600">{step.description}</p>
                      </div>
                      <div className="flex-1">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-auto rounded-xl shadow-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ce qu'en disent <span className="text-purple-600">Nos Clients</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez comment notre IA transforme les résultats marketing de nos clients
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    quote: "Nous avons pu remplacer 2 commerciaux et augmenter nos leads de 230% en seulement 3 mois avec la solution Techtrust.",
                    author: "Sophie M.",
                    company: "E-commerce Mode",
                    image: "/placeholder.svg"
                  },
                  {
                    quote: "L'IA de growth hacking a révolutionné notre approche marketing. Nous avons maintenant une machine d'acquisition qui tourne 24/7.",
                    author: "Thomas L.",
                    company: "Startup SaaS",
                    image: "/placeholder.svg"
                  },
                  {
                    quote: "Fini le temps perdu sur les réseaux sociaux ! L'IA gère tout notre community management et nos résultats ont doublé.",
                    author: "Marie P.",
                    company: "Agence Immobilière",
                    image: "/placeholder.svg"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-14 h-14 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Tarifs <span className="text-purple-600">Simples</span> et Transparents
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Des formules adaptées à toutes les tailles d'entreprise, sans engagement
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    name: "Starter",
                    price: "499€",
                    period: "/mois",
                    description: "Idéal pour les petites entreprises",
                    features: [
                      "1 canal d'acquisition",
                      "Jusqu'à 500 prospects/mois",
                      "Community management sur 2 réseaux",
                      "Dashboard analytics",
                      "Support email"
                    ],
                    cta: "Commencer"
                  },
                  {
                    name: "Business",
                    price: "999€",
                    period: "/mois",
                    description: "Pour les entreprises en croissance",
                    features: [
                      "3 canaux d'acquisition",
                      "Jusqu'à 2000 prospects/mois",
                      "Community management sur 4 réseaux",
                      "Analytics avancés avec IA",
                      "Support prioritaire",
                      "Intégration CRM"
                    ],
                    cta: "Démarrer l'essai",
                    highlight: true
                  },
                  {
                    name: "Enterprise",
                    price: "Sur mesure",
                    description: "Pour les grandes organisations",
                    features: [
                      "Canaux d'acquisition illimités",
                      "Prospects illimités",
                      "Community management sur tous les réseaux",
                      "Tableau de bord personnalisé",
                      "Support dédié 24/7",
                      "API personnalisée",
                      "Formation équipe incluse"
                    ],
                    cta: "Nous contacter"
                  }
                ].map((plan, index) => (
                  <div 
                    key={index} 
                    className={`rounded-xl p-8 border ${plan.highlight ? 'border-purple-300 bg-gradient-to-b from-purple-50 to-white shadow-xl relative' : 'border-gray-200'}`}
                  >
                    {plan.highlight && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Recommandé
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className={`w-5 h-5 ${plan.highlight ? 'text-purple-600' : 'text-green-600'} mt-0.5`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full ${plan.highlight ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      <a href="/contact">{plan.cta}</a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Prêt à Révolutionner votre Marketing ?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Remplacez vos commerciaux et community managers par notre IA et multipliez votre croissance par 10.
                Demandez une démonstration gratuite !
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <a href="/contact">Démo Gratuite</a>
              </Button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "L'IA peut-elle vraiment remplacer mes commerciaux ?",
                      answer: "Oui, notre IA est capable d'effectuer la plupart des tâches d'un commercial : prospection, qualification des leads, suivi et même conversion. Elle travaille 24/7 sans pause et peut gérer des milliers de conversations simultanément."
                    },
                    {
                      question: "Combien de temps faut-il pour voir des résultats ?",
                      answer: "Les premiers résultats sont généralement visibles dès la première semaine. Le système s'améliore avec le temps grâce à l'apprentissage machine, et atteint sa pleine performance après environ 1 mois d'utilisation."
                    },
                    {
                      question: "Comment l'IA gère-t-elle notre community management ?",
                      answer: "Notre IA peut créer du contenu original, planifier les publications, interagir avec votre audience et analyser les performances. Elle s'adapte à votre ton de communication et à votre stratégie de marque."
                    },
                    {
                      question: "Est-ce que je garde le contrôle sur les actions de l'IA ?",
                      answer: "Absolument. Vous définissez les règles et les limites, et vous pouvez intervenir à tout moment. Notre tableau de bord vous permet de suivre toutes les actions en temps réel."
                    },
                    {
                      question: "Comment l'IA s'intègre-t-elle à mes outils existants ?",
                      answer: "Notre plateforme s'intègre nativement avec plus de 50 outils marketing, CRM et réseaux sociaux. Pour les systèmes spécifiques, nous proposons une API complète."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
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

export default GrowthHacking;
