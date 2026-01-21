"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Bot, Users, Globe, TrendingUp, Code, Lightbulb, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    title: "Création Site Web",
    subtitle: "Sites professionnels & E-commerce",
    description: "Développement de sites web modernes 2025, optimisés SEO et adaptés à tous les appareils. De la vitrine e-commerce à l'application web complexe.",
    features: ["Design responsive 2025", "Optimisation SEO avancée", "Hébergement sécurisé permanence", "Maintenance incluse"],
    color: "#45C7FF",
    colorClass: "custom-blue",
    link: "/solutions/agence-web"
  },
  {
    icon: TrendingUp,
    title: "Growth Hacking IA",
    subtitle: "Automatisation complète + Community IA",
    description: "Nos outils IA propriétaires automatisent votre prospection, acquisition clients ET community management. Remplacez un commercial + community manager par notre IA ultra-performante.",
    features: ["IA de prospection automatisée", "Community management IA", "Email marketing intelligent", "Lead generation IA", "Analytics temps réel"],
    color: "#8B5CF6", 
    colorClass: "custom-purple",
    link: "/solutions/growth-hacking"
  },
  {
    icon: Code,
    title: "Solutions Sur Mesure",
    subtitle: "Développement personnalisé",
    description: "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus et booster votre productivité en 2025.",
    features: ["Audit métier complet", "Développement agile", "Formation équipe", "Support technique 24/7"],
    color: "#00CCC3",
    colorClass: "custom-green",
    link: "/solutions/digitales-sur-mesure"
  },
  {
    icon: MessageSquare,
    title: "Community Management Pro",
    subtitle: "Équipe dédiée experte",
    description: "Vous préférez déléguer à des professionnels ? Notre équipe de community managers experts gère vos réseaux avec stratégie personnalisée sur mesure.",
    features: ["Community manager dédié", "Stratégie sur mesure", "Création contenu professionnel", "Reporting détaillé mensuel"],
    color: "#EC4899",
    colorClass: "custom-pink",
    link: "/solutions/community-management"
  },
  {
    icon: Lightbulb,
    title: "Consulting Digital",
    subtitle: "Transformation & Innovation",
    description: "Accompagnement stratégique pour votre transformation digitale 2025. Digitalisation complète, projets d'envergure exceptionnelle.",
    features: ["Digitalisation complète", "Projets d'envergure", "Innovation technologique", "Accompagnement VIP"],
    color: "#F59E0B",
    colorClass: "custom-orange",
    link: "/solutions/consulting-digital"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            Notre Expertise 2025
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6"
          >
            Nos <span className="text-custom-blue">Solutions Digitales</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
              IA & Professionnelles
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-[#374151]"
          >
            <strong>Vous avez le choix :</strong> Utilisez nos outils IA en autonomie pour automatiser votre growth hacking + community management, 
            ou bénéficiez de l&apos;expertise de nos professionnels pour un accompagnement sur mesure.
          </motion.p>
        </div>

        {/* Distinction claire IA vs Pro */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <Bot className="w-12 h-12 text-custom-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#374151] mb-2">Outils IA Automatisés</h3>
              <p className="text-[#374151]">
                Parfait si vous voulez garder le contrôle et économiser. Nos IA remplacent un commercial + community manager.
              </p>
              <div className="mt-4 text-sm text-custom-blue font-medium">Solutions accessibles</div>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-custom-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#374151] mb-2">Équipe Professionnelle</h3>
              <p className="text-[#374151]">
                Idéal si vous préférez déléguer à des experts. Notre équipe gère tout avec une stratégie personnalisée.
              </p>
              <div className="mt-4 text-sm text-custom-purple font-medium">Sur mesure</div>
            </div>
          </div>
        </div>

        {/* Grille de services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white relative overflow-hidden h-full flex flex-col">
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}05, ${service.color}10)` 
                  }}
                ></div>
                
                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  {/* Icône professionnelle avec design moderne */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}15, ${service.color}25)`,
                      boxShadow: `0 10px 30px ${service.color}20, inset 0 1px 0 rgba(255,255,255,0.2)`
                    }}
                  >
                    {/* Effet de brillance subtil */}
                    <div 
                      className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl"
                    ></div>
                    <service.icon 
                      className="w-10 h-10 relative z-10" 
                      style={{ color: service.color }}
                    />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-[#374151] mb-2">{service.title}</h3>
                    <p 
                      className="font-medium mb-4 text-sm"
                      style={{ color: service.color }}
                    >
                      {service.subtitle}
                    </p>
                    <p className="text-[#374151] mb-6 leading-relaxed flex-1">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-[#374151]">
                          <Check 
                            className="w-4 h-4 mr-2 flex-shrink-0"
                            style={{ color: service.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button 
                      asChild
                      className="w-full text-white group/btn hover:shadow-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: service.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${service.color}e6`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = service.color;
                      }}
                    >
                      <Link href={service.link}>
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
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
            <p className="text-[#374151] mb-6">
              Découvrez nos solutions personnalisées !
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-custom-blue hover:bg-custom-blue/90 text-white hover:shadow-lg transition-all duration-300"
            >
              <Link href="/pricing">
                Voir nos solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
