
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, TrendingUp, Heart, Share2, Star } from 'lucide-react';

const CommunityManagement = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Community Management",
    "description": "Services de community management pour développer votre présence sur les réseaux sociaux et engager votre audience",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    }
  };

  return (
    <>
      <SEO
        title="Community Management | Gestion Réseaux Sociaux - Techtrust"
        description="📱 Community management expert ! Gestion réseaux sociaux, création contenu, engagement audience. +150% d'engagement garanti. Devis gratuit !"
        keywords="community management, gestion réseaux sociaux, social media, content marketing, engagement audience, stratégie sociale, instagram, facebook, linkedin, tiktok, community manager"
        canonicalUrl="https://www.tech-trust.fr/solutions/community-management"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-2 text-sm font-medium text-pink-600 mb-6">
                  <Users className="w-4 h-4" />
                  Community Management
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

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                    <a href="/contact">Audit gratuit</a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Voir nos succès
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
                  Services <span className="text-pink-600">Community Management</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: "Création de Contenu",
                    description: "Contenus créatifs et engageants adaptés à chaque plateforme sociale."
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Gestion Communauté",
                    description: "Animation et modération de votre communauté pour maximiser l'engagement."
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Stratégie Sociale",
                    description: "Stratégies personnalisées pour chaque réseau social et vos objectifs."
                  },
                  {
                    icon: <Heart className="w-8 h-8" />,
                    title: "Engagement Audience",
                    description: "Techniques pour booster l'interaction et fidéliser votre audience."
                  },
                  {
                    icon: <Share2 className="w-8 h-8" />,
                    title: "Campagnes Virales",
                    description: "Création de campagnes pour maximiser la portée et la viralité."
                  },
                  {
                    icon: <Star className="w-8 h-8" />,
                    title: "Influence Marketing",
                    description: "Collaboration avec des influenceurs pour amplifier votre message."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="text-pink-600 mb-4">{service.icon}</div>
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

export default CommunityManagement;
