"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, TrendingUp, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "200+",
    label: "Clients satisfaits",
    description: "Entreprises qui nous font confiance"
  },
  {
    icon: Globe,
    number: "500+", 
    label: "Sites créés",
    description: "Projets web réalisés avec succès"
  },
  {
    icon: TrendingUp,
    number: "300%",
    label: "Croissance moyenne",
    description: "Augmentation du trafic client"
  },
  {
    icon: Award,
    number: "98%",
    label: "Taux de satisfaction",
    description: "Clients qui recommandent nos services"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-custom-blue/90 to-custom-purple/90 text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-custom-green/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Des Résultats qui <span className="text-custom-green">Parlent</span>
          </h2>
          <p className="text-lg text-gray-300">
            Depuis notre création, nous avons accompagné des centaines d'entreprises 
            dans leur transformation digitale avec des résultats mesurables.
          </p>
        </div>

        {/* Grille de statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              {/* Icône */}
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-custom-green" />
              </div>

              {/* Nombre */}
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-custom-green mb-1">{stat.label}</h3>
              
              {/* Description */}
              <p className="text-sm text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Rejoignez nos clients satisfaits et boostez votre croissance dès aujourd'hui !
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
