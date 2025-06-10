
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Crown } from 'lucide-react';

const Pricing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tarifs Techtrust 2025",
    "description": "Découvrez nos tarifs transparents 2025 pour nos outils IA de growth hacking automatisés et services digitaux professionnels",
    "url": "https://www.tech-trust.fr/pricing"
  };

  const plans = [
    {
      name: "Starter IA",
      price: "97€",
      period: "/mois",
      description: "Parfait pour débuter avec nos outils IA",
      icon: Zap,
      features: [
        "Accès aux outils IA de prospection",
        "Community management automatisé",
        "Génération de contenu IA",
        "Analytics de base",
        "Support email",
        "Formation vidéo incluse"
      ],
      popular: false,
      color: "custom-green"
    },
    {
      name: "Business Pro",
      price: "297€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      icon: Users,
      features: [
        "Tous les outils IA avancés",
        "Automatisation complète growth hacking",
        "CRM intelligent intégré",
        "Rapports détaillés",
        "Support prioritaire",
        "Séances de coaching mensuel",
        "API et intégrations"
      ],
      popular: true,
      color: "custom-blue"
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      period: "",
      description: "Solutions complètes + équipe dédiée",
      icon: Crown,
      features: [
        "Tous les outils IA + équipe pro",
        "Community manager dédié",
        "Commercial dédié",
        "Développement sur mesure",
        "Support 24/7 prioritaire",
        "Formation équipe complète",
        "Accompagnement stratégique"
      ],
      popular: false,
      color: "custom-purple"
    }
  ];

  return (
    <>
      <SEO
        title="Tarifs 2025 | Outils IA Growth Hacking dès 97€/mois - Techtrust"
        description="💰 Tarifs transparents 2025 ! Outils IA de growth hacking automatisés dès 97€/mois. Community management IA, prospection automatisée, solutions pro. Devis gratuit !"
        keywords="tarifs techtrust 2025, prix outils ia growth hacking, community management automatisé, prospection ia, tarif abordable, solutions digitales"
        canonicalUrl="https://www.tech-trust.fr/pricing"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Tarifs <span className="text-custom-blue">2025</span> Transparents
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Des outils IA accessibles à tous pour automatiser votre growth hacking et community management. 
                  Des prix clairs, sans surprise.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4" />
                  Essai gratuit 14 jours - Sans engagement
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choisissez ce qui vous convient
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Que vous souhaitiez nos outils IA en autonomie ou un accompagnement professionnel complet, 
                  nous avons la solution qui correspond à vos besoins et votre budget.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                  <div key={index} className={`relative bg-white rounded-2xl border-2 p-8 ${plan.popular ? `border-${plan.color} shadow-xl scale-105` : 'border-gray-200 hover:border-gray-300'} transition-all duration-300`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className={`bg-${plan.color} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1`}>
                          <Star className="w-4 h-4" />
                          Plus populaire
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 bg-${plan.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <plan.icon className={`w-8 h-8 text-${plan.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className={`text-4xl font-bold text-${plan.color}`}>{plan.price}</span>
                        {plan.period && <span className="text-gray-500">{plan.period}</span>}
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 text-${plan.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.popular ? `bg-${plan.color} hover:bg-${plan.color}/90` : `border-2 border-${plan.color} text-${plan.color} hover:bg-${plan.color} hover:text-white`} ${!plan.popular ? 'bg-transparent' : ''}`}
                      size="lg"
                    >
                      <a href="/contact">
                        {plan.price === "Sur devis" ? "Demander un devis" : "Commencer maintenant"}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🤖 Pourquoi choisir nos outils IA en 2025 ?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✨ Automatisation totale</h4>
                      <p className="text-gray-600">Nos outils IA remplacent un community manager et un commercial. Prospection, création de contenu, gestion des réseaux sociaux : tout est automatisé.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🎯 Ultra simple à utiliser</h4>
                      <p className="text-gray-600">Interface intuitive, formation incluse. Vous gardez le contrôle total tout en économisant des milliers d'euros en salaires.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Une question sur nos tarifs ? Besoin d'une solution personnalisée ?</p>
                <Button variant="outline" size="lg" className="border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white">
                  <a href="/contact">Discutons de votre projet</a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
