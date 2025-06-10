
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tarifs Techtrust",
    "description": "Découvrez nos tarifs transparents pour nos services digitaux : création site web, growth hacking, solutions sur mesure",
    "url": "https://www.tech-trust.fr/pricing"
  };

  const plans = [
    {
      name: "Starter",
      price: "1 490€",
      description: "Parfait pour les petites entreprises",
      features: [
        "Site web 5 pages",
        "Design responsive",
        "SEO de base",
        "Support 30 jours",
        "Hébergement inclus 1 an"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "2 990€",
      description: "Idéal pour les entreprises en croissance",
      features: [
        "Site web jusqu'à 15 pages",
        "Design sur mesure",
        "SEO avancé",
        "Système de réservation",
        "Blog intégré",
        "Support 90 jours",
        "Formation incluse"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      description: "Solutions complètes pour grandes entreprises",
      features: [
        "Solution 100% personnalisée",
        "Application web complexe",
        "Intégrations systèmes",
        "Support prioritaire 24/7",
        "Formation équipes",
        "Maintenance incluse"
      ],
      popular: false
    }
  ];

  return (
    <>
      <SEO
        title="Tarifs Transparents | Prix Services Digitaux - Techtrust"
        description="💰 Tarifs clairs et transparents ! Création site web dès 1490€, solutions growth hacking, développement sur mesure. Devis gratuit en 24h !"
        keywords="tarifs techtrust, prix création site web, coût agence digitale, prix growth hacking, tarif développement web, devis site internet, prix agence web"
        canonicalUrl="https://www.tech-trust.fr/pricing"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Tarifs <span className="text-blue-600">Transparents</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Des prix clairs, sans surprise. Choisissez la formule qui correspond à vos besoins et votre budget.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4" />
                  Devis gratuit en 24h
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                  <div key={index} className={`relative bg-white rounded-2xl border-2 p-8 ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Plus populaire
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      size="lg"
                    >
                      <a href="/contact">
                        {plan.price === "Sur devis" ? "Demander un devis" : "Choisir ce plan"}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <p className="text-gray-600 mb-4">Besoin d'une solution personnalisée ?</p>
                <Button variant="outline" size="lg">
                  <a href="/contact">Parlons de votre projet</a>
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
