
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Crown } from 'lucide-react';

const partners = [
  {
    name: "Palais des Festivals de Cannes",
    logo: "/partners/palais-festivals-cannes.png",
    category: "Événementiel de prestige",
    description: "Gestion digitale de l'événement le plus prestigieux du cinéma mondial"
  },
  {
    name: "Groupe Chopard",
    logo: "/partners/chopard.png", 
    category: "Haute Horlogerie & Joaillerie",
    description: "Solutions e-commerce et stratégie digitale pour la maison de luxe suisse"
  },
  {
    name: "Christina France",
    logo: "/partners/christina-france.png",
    category: "Bijouterie de luxe",
    description: "Transformation digitale et community management"
  },
  {
    name: "Monaco Business",
    logo: "/partners/monaco-business.png",
    category: "Business & Finance",
    description: "Plateforme web sur mesure et lead generation"
  },
  {
    name: "Luxury Hotels Group",
    logo: "/partners/luxury-hotels.png",
    category: "Hôtellerie de luxe",
    description: "Système de réservation et marketing automation"
  },
  {
    name: "French Tech Riviera",
    logo: "/partners/french-tech-riviera.png",
    category: "Innovation & Tech",
    description: "Écosystème startup et solutions tech"
  }
];

const achievements = [
  {
    icon: Crown,
    title: "Clients prestigieux",
    value: "50+",
    description: "Marques de luxe et entreprises d'exception"
  },
  {
    icon: Award,
    title: "Projets réalisés",
    value: "500+",
    description: "Solutions digitales déployées avec succès"
  },
  {
    icon: Users,
    title: "Croissance moyenne",
    value: "+300%",
    description: "Augmentation du CA de nos clients"
  },
  {
    icon: Star,
    title: "Satisfaction client",
    value: "98%",
    description: "Taux de recommandation exceptionnel"
  }
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-custom-blue/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-custom-purple/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-custom-blue to-custom-purple text-white rounded-full px-6 py-2 text-sm font-medium mb-6"
          >
            <Crown className="w-4 h-4" />
            Références d'Excellence
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Ils nous font <span className="text-custom-blue">Confiance</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Du Palais des Festivals de Cannes aux plus grandes maisons de luxe, 
            découvrez pourquoi les leaders choisissent Techtrust pour leur transformation digitale.
          </motion.p>
        </div>

        {/* Statistiques de performance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-custom-blue to-custom-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{achievement.value}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Grille des partenaires */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Logo placeholder */}
              <div className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-gray-400">{partner.name.split(' ')[0]}</div>
              </div>
              
              {/* Contenu */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                  <span className="inline-block bg-custom-blue/10 text-custom-blue px-3 py-1 rounded-full text-sm font-medium">
                    {partner.category}
                  </span>
                </div>
                
                <p className="text-gray-600 leading-relaxed">{partner.description}</p>
                
                {/* Étoiles de satisfaction */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">Excellence garantie</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Rejoignez les leaders qui transforment leur secteur avec Techtrust
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-gradient-to-r from-custom-blue to-custom-purple text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
            >
              Devenir notre prochain succès
            </a>
            <a 
              href="/solutions" 
              className="border-2 border-custom-blue text-custom-blue px-8 py-4 rounded-xl font-semibold hover:bg-custom-blue hover:text-white transition-all duration-300 inline-flex items-center justify-center"
            >
              Découvrir nos solutions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
