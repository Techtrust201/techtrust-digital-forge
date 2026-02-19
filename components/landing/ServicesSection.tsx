import React from 'react';
import { ArrowRight, Check, Bot, Users, Globe, TrendingUp, Code, Lightbulb, MessageSquare, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    title: "Création Site Web",
    subtitle: "Sites professionnels & E-commerce",
    description: "Des sites web rapides, au design unique et optimisés pour le référencement. Du site vitrine au e-commerce, chaque projet est codé sur mesure pour des performances maximales.",
    features: ["Design unique sur mesure", "Optimisation SEO intégrée", "Performance ultra-rapide", "Responsive tous écrans"],
    color: "#45C7FF",
    colorClass: "custom-blue",
    link: "/solutions/agence-web"
  },
  {
    icon: TrendingUp,
    title: "Growth Hacking IA",
    subtitle: "Automatisation complète + Community IA",
    description: "Nos outils IA automatisent votre prospection et votre community management. Remplacez un commercial + community manager par notre IA, ou confiez tout à notre équipe.",
    features: ["IA de prospection automatisée", "Community management IA", "Email marketing intelligent", "Lead generation IA"],
    color: "#8B5CF6", 
    colorClass: "custom-purple",
    link: "/solutions/growth-hacking"
  },
  {
    icon: Code,
    title: "Applications Sur Mesure",
    subtitle: "Logiciels métier & applications web",
    description: "CRM, ERP, dashboards, applications métier — développés sur mesure pour coller parfaitement à vos processus. Vous êtes propriétaire du code à 100%.",
    features: ["Développement sur mesure", "Propriété du code source", "Intégrations API", "Support et maintenance"],
    color: "#00CCC3",
    colorClass: "custom-green",
    link: "/solutions/digitales-sur-mesure"
  },
  {
    icon: MessageSquare,
    title: "Community Management Pro",
    subtitle: "Équipe dédiée experte",
    description: "Vous préférez déléguer à des pros ? Notre équipe gère vos réseaux sociaux avec une stratégie personnalisée et du contenu créé pour votre marque.",
    features: ["Community manager dédié", "Stratégie personnalisée", "Contenu professionnel", "Reporting mensuel"],
    color: "#EC4899",
    colorClass: "custom-pink",
    link: "/solutions/community-management"
  },
  {
    icon: Target,
    title: "SEO, SEA & GEO",
    subtitle: "Visibilité Google & IA maximale",
    description: "Référencement naturel (SEO), publicité Google Ads (SEA), Google My Business et GEO pour être visible sur ChatGPT, Perplexity et Google AI Overviews.",
    features: ["Audit & stratégie SEO", "Campagnes Google Ads", "Google My Business optimisé", "GEO — visibilité IA"],
    color: "#10B981",
    colorClass: "custom-green",
    link: "/solutions/seo-referencement"
  },
  {
    icon: Lightbulb,
    title: "Consulting Digital",
    subtitle: "Transformation & Innovation",
    description: "Accompagnement stratégique pour votre transformation digitale. Audit, stratégie et mise en œuvre — on vous guide de A à Z.",
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
            Nos <span className="text-custom-blue">Solutions</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-purple to-custom-green">
              Digitales
            </span>
          </h2>

          <p 
            className="text-lg text-[#374151]"
          >
            <strong>Vous avez le choix :</strong> utilisez nos outils IA en autonomie pour automatiser votre acquisition client, 
            ou confiez votre projet à notre équipe d&apos;experts pour un accompagnement sur mesure.
          </p>
        </div>

        {/* IA vs Equipe Pro */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <Bot className="w-12 h-12 text-custom-blue mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-[#374151] mb-2">Outils IA Automatisés</h3>
              <p className="text-[#374151]">
                Gardez le contrôle et économisez. Nos IA remplacent un commercial + community manager pour une fraction du coût.
              </p>
              <div className="mt-4 text-sm text-custom-blue font-medium">Solutions accessibles</div>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-custom-purple mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-[#374151] mb-2">Équipe Professionnelle</h3>
              <p className="text-[#374151]">
                Déléguez à des experts. Notre équipe gère tout avec une stratégie personnalisée et des résultats mesurables.
              </p>
              <div className="mt-4 text-sm text-custom-purple font-medium">Sur mesure</div>
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
