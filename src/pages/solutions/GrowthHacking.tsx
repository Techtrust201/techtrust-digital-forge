
import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Users, Zap, BarChart3, Rocket } from 'lucide-react';

const GrowthHacking = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Growth Hacking",
    "description": "Services de growth hacking pour booster la croissance de votre entreprise avec des stratégies digitales innovantes",
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
        title="Growth Hacking | Stratégies de Croissance Digitale Explosive - Techtrust"
        description="🚀 Growth hacking expert pour booster votre croissance ! Acquisition clients, optimisation conversions, stratégies virales. +300% de croissance moyenne. Devis gratuit !"
        keywords="growth hacking, croissance digitale, acquisition client, optimisation conversion, marketing viral, stratégies growth, hacking croissance, lead generation, retention client, scaling business, growth marketing, acquisition utilisateurs"
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
                  <Rocket className="w-4 h-4" />
                  Growth Hacking Expert
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-purple-600">Growth Hacking</span>
                  <br />
                  Croissance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Explosive</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Multipliez votre croissance par <strong>10x</strong> avec nos stratégies de growth hacking éprouvées. 
                  De l'acquisition massive à la rétention client, nous hackons votre succès !
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <a href="/contact" className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Audit Growth Gratuit
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">72h</div>
                    <div className="text-gray-600">Première optimisation</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">ROI 8x</div>
                    <div className="text-gray-600">Retour sur investissement</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Nos Stratégies de <span className="text-purple-600">Growth Hacking</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Des méthodes éprouvées pour exploser votre croissance et dominer votre marché
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Acquisition Massive",
                    description: "Stratégies d'acquisition client innovantes et scalables pour exploser votre base utilisateurs."
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "Optimisation Conversion",
                    description: "Maximisation du taux de conversion avec des techniques de CRO avancées et A/B testing."
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Rétention & Engagement",
                    description: "Stratégies pour fidéliser vos clients et augmenter leur valeur vie (LTV)."
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Automation Marketing",
                    description: "Automatisation complète de vos tunnels de conversion pour une croissance passive."
                  },
                  {
                    icon: <BarChart3 className="w-8 h-8" />,
                    title: "Analytics & Data",
                    description: "Tracking avancé et analyse data-driven pour optimiser chaque étape du funnel."
                  },
                  {
                    icon: <Rocket className="w-8 h-8" />,
                    title: "Scaling Stratégique",
                    description: "Stratégies de mise à l'échelle pour passer de startup à scale-up rapidement."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="text-purple-600 mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Prêt à Hacker votre Croissance ?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Rejoignez les entreprises qui ont multiplié leur croissance par 10 avec nos stratégies de growth hacking.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <a href="/contact">Démarrer maintenant</a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GrowthHacking;
