
"use client"

import React from 'react';
import { 
  Zap, 
  Shield, 
  Headphones, 
  Smartphone, 
  Search, 
  BarChart3,
  Users,
  Clock,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Livraison Express",
    description: "Sites web livrés en 48h, applications en 2 semaines maximum"
  },
  {
    icon: Shield,
    title: "Sécurité Renforcée", 
    description: "SSL, sauvegardes automatiques et protection contre les cyberattaques"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Équipe technique disponible pour tous vos besoins urgents"
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    description: "Design adaptatif parfait sur mobile, tablette et desktop"
  },
  {
    icon: Search,
    title: "SEO Optimisé",
    description: "Référencement naturel intégré pour booster votre visibilité"
  },
  {
    icon: BarChart3,
    title: "Analytics Avancés",
    description: "Suivi détaillé des performances et recommandations d'amélioration"
  },
  {
    icon: Users,
    title: "Formation Incluse",
    description: "Formation complète de votre équipe sur tous nos outils"
  },
  {
    icon: Clock,
    title: "Maintenance Continue",
    description: "Mises à jour régulières et maintenance proactive incluse"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-custom-purple/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-custom-blue/5 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi Choisir <span className="text-custom-blue">Techtrust</span> ?
          </h2>
          <p className="text-lg text-gray-600">
            Une approche unique qui combine expertise technique, créativité et résultats mesurables 
            pour faire grandir votre business.
          </p>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="group text-center">
              {/* Icône */}
              <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-custom-blue group-hover:text-custom-purple transition-colors" />
              </div>

              {/* Contenu */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Section bonus */}
        <div className="mt-20 bg-gradient-to-r from-custom-blue to-custom-purple rounded-3xl p-8 lg:p-12 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-yellow-300" />
            <h3 className="text-2xl lg:text-3xl font-bold">
              Garantie Résultats
            </h3>
          </div>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Si vous n'êtes pas 100% satisfait de nos services dans les 30 premiers jours, 
            nous vous remboursons intégralement. C'est notre engagement qualité !
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
