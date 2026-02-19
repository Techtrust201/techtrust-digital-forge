import React from 'react';
import { ArrowRight, Check, Users, Globe, TrendingUp, Code, Lightbulb, MessageSquare, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    title: "Création Site Web",
    subtitle: "100% codé à la main — zéro template",
    description: "Chaque site est codé de A à Z avec Next.js, React et TypeScript. Pas de WordPress, pas de Wix, pas de thème préfabriqué. Du code propre, rapide et optimisé SEO dès le départ.",
    features: ["Code sur mesure (Next.js, React)", "Design unique sans template", "SEO technique natif", "Performance maximale"],
    color: "#45C7FF",
    colorClass: "custom-blue",
    link: "/solutions/agence-web"
  },
  {
    icon: TrendingUp,
    title: "Growth Hacking IA",
    subtitle: "Automatisation complète + Community IA",
    description: "Nos outils IA propriétaires automatisent votre prospection et votre community management. Remplacez un commercial + community manager par notre IA, ou confiez tout à notre équipe.",
    features: ["IA de prospection automatisée", "Community management IA", "Email marketing intelligent", "Lead generation IA"],
    color: "#8B5CF6", 
    colorClass: "custom-purple",
    link: "/solutions/growth-hacking"
  },
  {
    icon: Code,
    title: "Applications Sur Mesure",
    subtitle: "Logiciels métier codés from scratch",
    description: "CRM, ERP, dashboards, applications métier — tout est développé sur mesure pour coller parfaitement à vos processus. Vous êtes propriétaire du code à 100%.",
    features: ["Développement sur mesure total", "Propriété du code source", "Intégrations API", "Support et maintenance"],
    color: "#00CCC3",
    colorClass: "custom-green",
    link: "/solutions/digitales-sur-mesure"
  },
  {
    icon: MessageSquare,
    title: "Community Management Pro",
    subtitle: "Équipe dédiée experte",
    description: "Vous préférez déléguer à des pros ? Notre équipe gère vos réseaux sociaux avec une stratégie sur mesure et du contenu créé spécifiquement pour votre marque.",
    features: ["Community manager dédié", "Stratégie sur mesure", "Contenu professionnel", "Reporting mensuel"],
    color: "#EC4899",
    colorClass: "custom-pink",
    link: "/solutions/community-management"
  },
  {
    icon: Target,
    title: "SEO, SEA & GEO",
    subtitle: "Visibilité Google maximale",
    description: "Référencement naturel (SEO), Google Ads (SEA), Google My Business et GEO (visibilité sur ChatGPT, Perplexity). Notre code sur mesure nous donne un avantage technique que WordPress ne pourra jamais offrir.",
    features: ["SEO technique natif (code sur mesure)", "Campagnes Google Ads", "Google My Business optimisé", "GEO — visibilité IA"],
    color: "#10B981",
    colorClass: "custom-green",
    link: "/solutions/seo-referencement"
  },
  {
    icon: Lightbulb,
    title: "Consulting Digital",
    subtitle: "Transformation & Innovation",
    description: "Accompagnement stratégique pour votre transformation digitale. Audit, stratégie, mise en œuvre — on vous guide de A à Z sans solution toute faite.",
    features: ["Audit digital complet", "Stratégie sur mesure", "Innovation technologique", "Accompagnement VIP"],
    color: "#F59E0B",
    colorClass: "custom-orange",
    link: "/solutions/consulting-digital"
  }
];

interface ServicesSectionProps {
  locale: string;
}

const ServicesSection = ({ locale }: ServicesSectionProps) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-custom-blue px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            Notre Expertise
          </span>

          <h2 
            className="text-3xl lg:text-5xl font-bold text-[#374151] mb-6"
          >
            Tout est <span className="text-custom-blue">codé sur mesure</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
              de A à Z
            </span>
          </h2>

          <p 
            className="text-lg text-[#374151]"
          >
            Chez Techtrust, <strong>on ne fait pas de WordPress, pas de Wix, pas de template</strong>. 
            Chaque projet est codé à la main pour des performances, un SEO et une sécurité impossibles à atteindre avec des solutions toutes faites.
          </p>
        </div>

        {/* Code sur mesure vs Templates */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center border-r border-gray-200 pr-8">
              <Code className="w-12 h-12 text-custom-blue mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-[#374151] mb-2">Techtrust — Code sur mesure</h3>
              <p className="text-[#374151]">
                Next.js, React, TypeScript. Chaque ligne de code est écrite pour VOTRE projet. Performance, SEO et sécurité au maximum.
              </p>
              <div className="mt-4 text-sm text-custom-blue font-bold">Ce qu&apos;on fait</div>
            </div>
            
            <div className="text-center pl-8 opacity-60">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">WordPress / Wix / Templates</h3>
              <p className="text-gray-400">
                Sites génériques, lents, vulnérables aux failles de sécurité. SEO limité par la plateforme. Vous ne possédez pas votre code.
              </p>
              <div className="mt-4 text-sm text-gray-400 font-bold line-through">Ce qu&apos;on ne fait PAS</div>
            </div>
          </div>
        </div>

        {/* Grille de services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.title}
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
                    <div 
                      className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl"
                    ></div>
                    <service.icon 
                      className="w-10 h-10 relative z-10" 
                      style={{ color: service.color }}
                      aria-hidden="true"
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
                            aria-hidden="true"
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
                      className="w-full text-white hover:opacity-90 hover:shadow-lg transition-all duration-300"
                      style={{ backgroundColor: service.color }}
                    >
                      <Link href={`/${locale}${service.link}`}>
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA global */}
        <div className="text-center mt-16">
          <p className="text-[#374151] mb-6">
            Découvrez nos solutions personnalisées !
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-custom-blue hover:bg-custom-blue/90 text-white hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/${locale}/pricing`}>
              Voir nos solutions
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
