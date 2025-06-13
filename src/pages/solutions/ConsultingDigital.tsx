
import React from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target, BarChart3, Zap, Users, Rocket, Crown, Building, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const ConsultingDigital = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consulting Digital Premium",
    "description": "Services de consulting digital haut de gamme pour accompagner votre transformation numérique et projets d'envergure exceptionnelle",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    }
  };

  const prestigiousProjects = [
    {
      title: "Palais des Festivals de Cannes",
      description: "Digitalisation complète du système de gestion des événements",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      features: ["Système de billetterie", "Gestion des accréditations", "App mobile", "Analytics avancés"]
    },
    {
      title: "Groupe Chopard",
      description: "Transformation digitale de la chaîne de distribution",
      image: "https://images.unsplash.com/photo-1594736797933-d0d3ef611763?w=400&h=250&fit=crop",
      features: ["CRM luxury", "E-commerce premium", "Traçabilité blockchain", "IA prédictive"]
    },
    {
      title: "Christina France",
      description: "Plateforme digitale de gestion de la beauté professionnelle",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      features: ["Formation en ligne", "Booking système", "Inventaire intelligent", "Marketing automation"]
    }
  ];

  return (
    <>
      <SEO
        title="Consulting Digital Premium | Transformation Numérique Haut de Gamme - Techtrust"
        description="🏆 Consulting digital d'exception ! Digitalisation Palais des Festivals, Chopard, projets d'envergure. Transformation numérique premium. Consultation VIP gratuite !"
        keywords="consulting digital premium, transformation numérique, digitalisation palais festivals cannes, chopard digital, projets envergure, conseil haut gamme"
        canonicalUrl="https://www.tech-trust.fr/solutions/consulting-digital"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-2 text-sm font-medium text-amber-600 mb-6">
                  <Crown className="w-4 h-4" />
                  Consulting Premium - Projets d'Exception
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-[#374151] mb-6">
                  <span className="text-[#F59E0B]">Consulting Digital</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">d'Exception</span>
                </h1>
                
                <p className="text-xl text-[#374151] mb-8 max-w-3xl mx-auto">
                  Nous digitalisons les <strong>plus prestigieuses institutions</strong> comme le Palais des Festivals de Cannes, 
                  Chopard et Christina France. <strong>Projets d'envergure exceptionnelle</strong> pour clients visionnaires.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="bg-[#F59E0B] hover:bg-amber-600 text-white">
                    <a href="/contact" className="flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Consultation VIP Gratuite
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white">
                    Voir nos réalisations prestigieuses
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-[#F59E0B] mb-2">15M€+</div>
                    <div className="text-[#374151]">Projets digitalisés</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                    <div className="text-[#374151]">Grands comptes</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                    <div className="text-[#374151]">Projets réussis</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prestigious Projects Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6">
                  Nos <span className="text-[#F59E0B]">Réalisations</span> Prestigieuses
                </h2>
                <p className="text-xl text-[#374151] max-w-3xl mx-auto">
                  Découvrez comment nous transformons digitalement les plus grandes institutions et marques de luxe
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {prestigiousProjects.map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Building className="w-6 h-6 mb-2" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#374151] mb-3">{project.title}</h3>
                      <p className="text-[#374151] mb-4">{project.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-[#374151]">
                            <CheckCircle className="w-4 h-4 text-[#F59E0B] mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white">
                        Découvrir le projet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6">
                  Notre Expertise <span className="text-[#F59E0B]">Premium</span>
                </h2>
                <p className="text-xl text-[#374151] max-w-3xl mx-auto">
                  Des solutions sur mesure pour les projets les plus ambitieux et complexes
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Building className="w-8 h-8" />,
                    title: "Digitalisation Complète",
                    description: "Transformation numérique totale de vos processus métier et systèmes d'information.",
                    color: "F59E0B"
                  },
                  {
                    icon: <Crown className="w-8 h-8" />,
                    title: "Projets d'Envergure",
                    description: "Gestion de projets complexes multi-millions avec équipes dédiées d'experts.",
                    color: "D97706"
                  },
                  {
                    icon: <Sparkles className="w-8 h-8" />,
                    title: "Innovation Technologique",
                    description: "Technologies de pointe : IA, blockchain, IoT, réalité augmentée intégrées.",
                    color: "F59E0B"
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "Stratégie Data",
                    description: "Architecture data moderne avec analytics avancés et intelligence artificielle.",
                    color: "D97706"
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Accompagnement VIP",
                    description: "Support premium 24/7 avec chef de projet dédié et équipe d'experts.",
                    color: "F59E0B"
                  },
                  {
                    icon: <Rocket className="w-8 h-8" />,
                    title: "Déploiement Global",
                    description: "Mise en œuvre internationale avec gestion multi-sites et multi-langues.",
                    color: "D97706"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow group">
                    <div className={`text-[#${service.color}] mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#374151] mb-3">{service.title}</h3>
                    <p className="text-[#374151]">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6">
                    Notre <span className="text-[#F59E0B]">Méthodologie</span> Premium
                  </h2>
                  <p className="text-xl text-[#374151] max-w-3xl mx-auto">
                    Une approche éprouvée sur des dizaines de projets d'exception
                  </p>
                </div>

                <div className="space-y-16">
                  {[
                    {
                      step: "1",
                      title: "Audit Stratégique Complet",
                      description: "Analyse approfondie de votre écosystème, identification des opportunités et définition de la roadmap de transformation.",
                      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
                    },
                    {
                      step: "2", 
                      title: "Architecture & Conception",
                      description: "Conception de l'architecture technique et fonctionnelle avec les meilleures technologies du marché.",
                      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop"
                    },
                    {
                      step: "3",
                      title: "Développement & Intégration",
                      description: "Développement sur mesure avec méthodologie agile, tests rigoureux et intégration progressive.",
                      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop"
                    },
                    {
                      step: "4",
                      title: "Déploiement & Formation",
                      description: "Mise en production sécurisée, formation des équipes et accompagnement post-déploiement.",
                      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
                    }
                  ].map((step, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                      <div className="flex-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F59E0B] text-white font-bold text-lg mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-[#374151] mb-4">{step.title}</h3>
                        <p className="text-lg text-[#374151]">{step.description}</p>
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

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-[#F59E0B] to-amber-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Prêt pour un Projet d'Exception ?
              </h2>
              <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
                Rejoignez les plus prestigieuses institutions qui nous font confiance. 
                Consultation VIP gratuite pour évaluer votre projet.
              </p>
              <Button size="lg" className="bg-white text-[#F59E0B] hover:bg-amber-50">
                <a href="/contact" className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Consultation VIP Gratuite
                </a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConsultingDigital;
