
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Code, MessageSquare, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Globe,
    title: "Création Site Web",
    subtitle: "Sites professionnels & E-commerce",
    description: "Développement de sites web modernes, optimisés SEO et adaptés à tous les appareils. De la vitrine e-commerce à l'application web complexe.",
    features: ["Design responsive", "Optimisation SEO", "Hébergement sécurisé", "Maintenance incluse"],
    color: "custom-blue",
    link: "/solutions/agence-web"
  },
  {
    icon: TrendingUp,
    title: "Growth Hacking",
    subtitle: "Acquisition & Croissance",
    description: "Stratégies de growth hacking pour multiplier vos leads et conversions. Prospection automatisée, email marketing et optimisation des tunnels de vente.",
    features: ["Lead generation", "Email marketing", "Automation", "Analytics avancés"],
    color: "custom-purple", 
    link: "/solutions/growth-hacking"
  },
  {
    icon: Code,
    title: "Solutions Sur Mesure",
    subtitle: "Développement personnalisé",
    description: "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus et booster votre productivité.",
    features: ["Audit métier", "Développement agile", "Formation équipe", "Support technique"],
    color: "custom-green",
    link: "/solutions/digitales-sur-mesure"
  },
  {
    icon: MessageSquare,
    title: "Community Management",
    subtitle: "Réseaux sociaux & Contenu",
    description: "Gestion professionnelle de vos réseaux sociaux. Stratégie éditoriale, création de contenus engageants et suivi des performances.",
    features: ["Stratégie sociale", "Création contenu", "Veille concurrentielle", "Reporting mensuel"],
    color: "custom-pink",
    link: "/solutions/community-management"
  },
  {
    icon: Lightbulb,
    title: "Consulting Digital",
    subtitle: "Stratégie & Transformation",
    description: "Accompagnement stratégique pour votre transformation digitale. Audit, recommandations et feuille de route personnalisée.",
    features: ["Audit digital", "Stratégie data", "Formation équipes", "Accompagnement projet"],
    color: "custom-slate",
    link: "/solutions/consulting-digital"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-custom-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-custom-purple/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-custom-blue/20 to-custom-purple/20 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            Notre Expertise
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Nos <span className="text-custom-blue">Solutions Digitales</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
              Sur Mesure
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            De la création de votre site web à l'acquisition de vos premiers clients, 
            nous accompagnons votre croissance à chaque étape avec des solutions personnalisées.
          </motion.p>
        </div>

        {/* Grille de services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white relative overflow-hidden h-full">
                {/* Gradient de fond */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/5 to-${service.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <CardContent className="p-8 relative z-10 h-full flex flex-col">
                  {/* Icône */}
                  <div className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 text-${service.color}`} />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className={`text-${service.color} font-medium mb-4 text-sm`}>{service.subtitle}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Check className={`w-4 h-4 text-${service.color} mr-2 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div>
                    <Button 
                      asChild
                      className={`w-full bg-${service.color} hover:bg-${service.color}/90 text-white group/btn`}
                    >
                      <a href={service.link}>
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA global */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-6">
              Besoin d'une solution personnalisée ? Parlons de votre projet !
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-custom-blue to-custom-purple text-white hover:shadow-lg transition-all duration-300"
            >
              <a href="/contact">
                Demander un devis gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
