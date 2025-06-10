
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Code, Smartphone, Database, Cloud, Shield, Cpu } from 'lucide-react';

const SolutionsDigitales = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solutions Digitales Sur Mesure",
    "description": "Développement de solutions digitales personnalisées, applications web et mobiles, logiciels métier sur mesure",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    }
  };

  return (
    <>
      <SEO
        title="Solutions Digitales Sur Mesure | Développement Logiciel - Techtrust"
        description="💻 Solutions digitales sur mesure : applications web, mobiles, logiciels métier. Développement personnalisé pour votre entreprise. Devis gratuit !"
        keywords="solutions digitales sur mesure, développement logiciel, application web, application mobile, logiciel métier, développement personnalisé, software sur mesure, système d'information, transformation digitale"
        canonicalUrl="https://www.tech-trust.fr/solutions/digitales-sur-mesure"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-600 mb-6">
                  <Code className="w-4 h-4" />
                  Solutions Sur Mesure
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Solutions Digitales
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sur Mesure</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Développement de solutions digitales personnalisées pour répondre exactement à vos besoins métier. 
                  De l'application web au logiciel complexe, nous créons votre outil parfait.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <a href="/contact">Discuter de mon projet</a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Voir nos réalisations
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
                  Nos <span className="text-blue-600">Solutions</span> Digitales
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Code className="w-8 h-8" />,
                    title: "Applications Web",
                    description: "Applications web sur mesure avec les dernières technologies modernes."
                  },
                  {
                    icon: <Smartphone className="w-8 h-8" />,
                    title: "Apps Mobiles",
                    description: "Applications mobiles natives et hybrides pour iOS et Android."
                  },
                  {
                    icon: <Database className="w-8 h-8" />,
                    title: "Logiciels Métier",
                    description: "Logiciels personnalisés pour optimiser vos processus internes."
                  },
                  {
                    icon: <Cloud className="w-8 h-8" />,
                    title: "Solutions Cloud",
                    description: "Architecture cloud scalable et sécurisée pour vos applications."
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Sécurité Avancée",
                    description: "Protection maximale avec les meilleures pratiques de sécurité."
                  },
                  {
                    icon: <Cpu className="w-8 h-8" />,
                    title: "IA & Automatisation",
                    description: "Intégration d'intelligence artificielle et automatisation des tâches."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="text-blue-600 mb-4">{service.icon}</div>
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

export default SolutionsDigitales;
