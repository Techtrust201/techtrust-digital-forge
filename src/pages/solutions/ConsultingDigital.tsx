
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target, BarChart3, Zap, Users, Rocket } from 'lucide-react';

const ConsultingDigital = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consulting Digital",
    "description": "Services de consulting digital pour accompagner votre transformation numérique et optimiser votre stratégie digitale",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    }
  };

  return (
    <>
      <SEO
        title="Consulting Digital | Conseil Stratégie Numérique - Techtrust"
        description="🎯 Consulting digital expert ! Transformation numérique, stratégie digitale, audit tech. Accompagnement personnalisé. Consultation gratuite !"
        keywords="consulting digital, conseil numérique, transformation digitale, stratégie numérique, audit digital, conseil tech, consultant digital, expertise numérique"
        canonicalUrl="https://www.tech-trust.fr/solutions/consulting-digital"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2 text-sm font-medium text-orange-600 mb-6">
                  <Lightbulb className="w-4 h-4" />
                  Consulting Digital
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Consulting
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Digital</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Accompagnement expert pour votre transformation digitale. Stratégie, audit, optimisation : 
                  nous vous guidons vers le succès numérique.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    <a href="/contact">Consultation gratuite</a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Nos expertises
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos Services de <span className="text-orange-600">Consulting</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "Stratégie Digitale",
                    description: "Définition de votre stratégie numérique pour atteindre vos objectifs business."
                  },
                  {
                    icon: <BarChart3 className="w-8 h-8" />,
                    title: "Audit Digital",
                    description: "Analyse complète de votre écosystème digital et recommandations d'amélioration."
                  },
                  {
                    icon: <Rocket className="w-8 h-8" />,
                    title: "Transformation Numérique",
                    description: "Accompagnement dans votre transformation digitale de A à Z."
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Optimisation Performance",
                    description: "Amélioration des performances de vos outils et processus digitaux."
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Formation Équipes",
                    description: "Formation de vos équipes aux nouvelles technologies et méthodes."
                  },
                  {
                    icon: <Lightbulb className="w-8 h-8" />,
                    title: "Innovation Digitale",
                    description: "Identification d'opportunités d'innovation pour votre secteur."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="text-orange-600 mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConsultingDigital;
