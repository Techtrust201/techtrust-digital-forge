
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Crown, X, Globe, Code, Lightbulb, Shield, Rocket, Diamond, Award } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Package {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  setupFee?: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  icon: React.ElementType;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  packages: Package[];
}

const Pricing = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<string>('website');
  const [selectedPackages, setSelectedPackages] = useState<{[serviceId: string]: string}>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    acceptsTerms: false,
    acceptsMarketing: false
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solutions Digitales Techtrust 2025",
    "description": "Agence web, growth hacking IA, community management et consulting digital. Solutions professionnelles pour PME et entreprises.",
    "provider": {
      "@type": "Organization",
      "name": "Techtrust",
      "url": "https://www.tech-trust.fr"
    },
    "areaServed": "France",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Digitaux",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Création Site Web",
            "description": "Sites web professionnels et e-commerce optimisés SEO"
          }
        }
      ]
    }
  };

  const services: Service[] = [
    {
      id: 'website',
      title: 'Création Site Web',
      subtitle: 'Sites professionnels & E-commerce',
      description: 'Développement de sites web modernes 2025, optimisés SEO et adaptés à tous les appareils.',
      icon: Globe,
      color: '3B82F6',
      packages: [
        {
          id: 'website-starter',
          name: 'Starter',
          price: '15€/mois',
          setupFee: '599€ configuration',
          badge: 'Économique',
          badgeColor: 'bg-green-100 text-green-800',
          description: 'Parfait pour les entrepreneurs et petites entreprises qui débutent',
          tier: 'bronze',
          icon: Shield,
          features: [
            'Site web responsive moderne',
            'Nom de domaine .fr/.com inclus 1 an',
            'Hébergement sécurisé France',
            'Certificat SSL gratuit',
            'Interface d\'administration simple',
            'Sauvegarde automatique quotidienne',
            'Support email prioritaire',
            'Formation vidéo incluse',
            'Optimisation mobile parfaite'
          ],
          notIncluded: [
            'E-commerce avancé',
            'Multilingue',
            'SEO premium',
            'Intégrations API',
            'Analytics avancés'
          ]
        },
        {
          id: 'website-business',
          name: 'Business',
          price: '29€/mois',
          originalPrice: '49€/mois',
          setupFee: '899€ configuration',
          badge: 'Le plus populaire',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Solution complète pour entreprises en croissance avec e-commerce',
          tier: 'silver',
          icon: Rocket,
          popular: true,
          features: [
            'Tout du plan Starter +',
            'Boutique e-commerce complète',
            'Paiement sécurisé Stripe/PayPal',
            'Gestion stock automatisée',
            'Site multilingue (3 langues)',
            'SEO avancé + Google My Business',
            'Blog professionnel intégré',
            'Analytics détaillés',
            'Formulaires de contact avancés',
            'Chat support prioritaire',
            '3 comptes utilisateurs',
            'Formation personnalisée 2h'
          ],
          notIncluded: [
            'Marketplace multi-vendeurs',
            'API custom',
            'White label'
          ]
        },
        {
          id: 'website-premium',
          name: 'Premium',
          price: '59€/mois',
          originalPrice: '99€/mois',
          setupFee: '1499€ configuration',
          badge: 'Solution complète',
          badgeColor: 'bg-purple-100 text-purple-800',
          description: 'Plateforme web enterprise avec fonctionnalités avancées',
          tier: 'gold',
          icon: Crown,
          features: [
            'Tout du plan Business +',
            'Marketplace multi-vendeurs',
            'Application mobile PWA',
            'Intégrations ERP/CRM',
            'API personnalisée',
            'White label disponible',
            'CDN mondial Cloudflare',
            'Support 24/7 dédié',
            'Utilisateurs illimités',
            'Formation équipe complète',
            'Consultant dédié',
            'Garantie 99.9% uptime'
          ]
        },
        {
          id: 'website-enterprise',
          name: 'Enterprise',
          price: 'Sur devis',
          badge: 'Sur mesure',
          badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
          description: 'Solutions enterprise sur mesure avec accompagnement VIP',
          tier: 'diamond',
          icon: Diamond,
          features: [
            'Architecture sur mesure',
            'Développement spécifique',
            'Sécurité renforcée',
            'Compliance RGPD/ISO',
            'Équipe dédiée',
            'SLA personnalisé',
            'Formation avancée',
            'Maintenance préventive'
          ]
        }
      ]
    },
    {
      id: 'growth-hacking',
      title: 'Growth Hacking IA',
      subtitle: '🤖 Automatisation complète + Community IA',
      description: 'Nos outils IA automatisent votre prospection, acquisition clients ET community management.',
      icon: Zap,
      color: '8B5CF6',
      packages: [
        {
          id: 'growth-starter',
          name: 'Starter IA',
          price: '39€/mois',
          badge: 'Automatisation basic',
          badgeColor: 'bg-green-100 text-green-800',
          description: 'Automation marketing essentielle pour débuter',
          tier: 'bronze',
          icon: Shield,
          features: [
            'Prospection automatisée (500 leads/mois)',
            'Email marketing IA (2000 emails/mois)',
            'Chatbot site web intelligent',
            'Gestion 2 réseaux sociaux',
            'Analytics de base',
            'Templates prêts à l\'emploi',
            'Formation vidéo complète',
            'Support email'
          ],
          notIncluded: [
            'LinkedIn automation',
            'SMS marketing',
            'Intégrations CRM',
            'A/B testing avancé'
          ]
        },
        {
          id: 'growth-pro',
          name: 'Pro IA',
          price: '89€/mois',
          originalPrice: '149€/mois',
          badge: 'Recommandé',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Suite complète d\'automatisation pour entreprises ambitieuses',
          tier: 'silver',
          icon: Rocket,
          popular: true,
          features: [
            'Tout du plan Starter +',
            'Prospection illimitée',
            'LinkedIn automation premium',
            'SMS marketing (5000 SMS/mois)',
            'Gestion 5 réseaux sociaux',
            'Community management IA',
            'Sequences email avancées',
            'Intégrations CRM (HubSpot, Salesforce)',
            'A/B testing automatisé',
            'Rapports détaillés',
            'Support prioritaire'
          ],
          notIncluded: [
            'White label',
            'API accès',
            'Multi-comptes'
          ]
        },
        {
          id: 'growth-enterprise',
          name: 'Enterprise IA',
          price: '199€/mois',
          originalPrice: '299€/mois',
          badge: 'Solution complète',
          badgeColor: 'bg-purple-100 text-purple-800',
          description: 'Plateforme enterprise avec IA avancée et équipe dédiée',
          tier: 'gold',
          icon: Crown,
          features: [
            'Tout du plan Pro +',
            'Comptes multiples illimités',
            'IA personnalisée secteur',
            'API complète',
            'White label disponible',
            'Manager de compte dédié',
            'Formation équipe sur site',
            'Intégrations custom',
            'Support 24/7',
            'Garantie ROI',
            'Consulting stratégique mensuel'
          ]
        }
      ]
    },
    {
      id: 'community',
      title: 'Community Management Pro',
      subtitle: 'Équipe dédiée experte',
      description: 'Notre équipe de community managers experts gère vos réseaux avec stratégie personnalisée.',
      icon: Users,
      color: 'EC4899',
      packages: [
        {
          id: 'community-essential',
          name: 'Essential',
          price: '690€/mois',
          badge: 'Gestion de base',
          badgeColor: 'bg-green-100 text-green-800',
          description: 'Community management professionnel pour petites entreprises',
          tier: 'bronze',
          icon: Shield,
          features: [
            'Community manager junior dédié',
            'Gestion 3 réseaux sociaux',
            '12 publications/mois',
            '8 stories/mois',
            'Réponse commentaires H+4',
            'Rapport mensuel détaillé',
            'Calendrier éditorial',
            'Veille concurrentielle basic'
          ],
          notIncluded: [
            'Vidéos professionnelles',
            'Publicités payantes',
            'Événements live',
            'Influenceurs'
          ]
        },
        {
          id: 'community-growth',
          name: 'Growth',
          price: '1290€/mois',
          originalPrice: '1690€/mois',
          badge: 'Le plus demandé',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Stratégie complète avec création de contenu premium',
          tier: 'silver',
          icon: Rocket,
          popular: true,
          features: [
            'Community manager senior dédié',
            'Gestion tous réseaux sociaux',
            '25 publications/mois',
            '20 stories/mois',
            '4 réels/vidéos pro/mois',
            'Campagnes publicitaires (500€ budget inclus)',
            'Réponse temps réel H+1',
            'Rapport hebdomadaire',
            'Événements live mensuels',
            'Partenariats micro-influenceurs',
            'Photoshoot produits inclus'
          ],
          notIncluded: [
            'Macro-influenceurs',
            'Production vidéo studio',
            'Événements physiques'
          ]
        },
        {
          id: 'community-premium',
          name: 'Premium',
          price: '2490€/mois',
          badge: 'Solution VIP',
          badgeColor: 'bg-purple-100 text-purple-800',
          description: 'Service VIP avec équipe complète et influence marketing',
          tier: 'gold',
          icon: Crown,
          features: [
            'Équipe complète dédiée (3 personnes)',
            'Stratégie influence premium',
            'Contenu illimité',
            'Production vidéo studio',
            'Campagnes publicitaires (2000€ budget)',
            'Partenariats macro-influenceurs',
            'Événements physiques',
            'Reporting temps réel',
            'Manager de compte dédié',
            'Consulting stratégique'
          ]
        }
      ]
    },
    {
      id: 'solutions',
      title: 'Solutions Sur Mesure',
      subtitle: 'Développement personnalisé',
      description: 'Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus.',
      icon: Code,
      color: '10B981',
      packages: [
        {
          id: 'solutions-app',
          name: 'Application Basic',
          price: '12900€',
          badge: 'Projet simple',
          badgeColor: 'bg-green-100 text-green-800',
          description: 'Application métier simple pour digitaliser vos processus',
          tier: 'bronze',
          icon: Shield,
          features: [
            'Application web responsive',
            'Interface utilisateur moderne',
            'Base de données sécurisée',
            'Authentification multi-niveaux',
            'Dashboard analytics',
            'Exports PDF/Excel',
            'Formation équipe 1 jour',
            'Maintenance 6 mois incluse',
            'Documentation complète'
          ],
          notIncluded: [
            'Application mobile native',
            'API externe',
            'Intégrations ERP',
            'Intelligence artificielle'
          ]
        },
        {
          id: 'solutions-erp',
          name: 'ERP/CRM Custom',
          price: '29900€',
          originalPrice: '39900€',
          badge: 'Solution métier',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Système de gestion complet adapté à votre métier',
          tier: 'silver',
          icon: Rocket,
          popular: true,
          features: [
            'Tout du plan Application +',
            'Modules métier personnalisés',
            'CRM intégré complet',
            'Gestion stocks/commandes',
            'Facturation automatisée',
            'Application mobile native',
            'Intégrations comptables',
            'Workflow automatisés',
            'Formation équipe 3 jours',
            'Maintenance 1 an incluse',
            'Support prioritaire'
          ],
          notIncluded: [
            'IA/Machine Learning',
            'Intégrations marketplace',
            'Support 24/7'
          ]
        },
        {
          id: 'solutions-enterprise',
          name: 'Plateforme Enterprise',
          price: 'Sur devis',
          badge: 'Architecture complexe',
          badgeColor: 'bg-purple-100 text-purple-800',
          description: 'Plateforme enterprise avec architecture scalable et IA',
          tier: 'gold',
          icon: Crown,
          features: [
            'Architecture microservices',
            'Intelligence artificielle intégrée',
            'Scalabilité illimitée',
            'Sécurité enterprise',
            'API complète',
            'Intégrations illimitées',
            'Équipe dédiée',
            'Support 24/7',
            'Formation avancée',
            'Consulting continu',
            'SLA personnalisé'
          ]
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Consulting Digital',
      subtitle: 'Transformation & Innovation',
      description: 'Accompagnement stratégique pour votre transformation digitale 2025.',
      icon: Lightbulb,
      color: 'F59E0B',
      packages: [
        {
          id: 'consulting-audit',
          name: 'Audit Digital',
          price: '2990€',
          badge: 'Diagnostic',
          badgeColor: 'bg-green-100 text-green-800',
          description: 'Diagnostic complet de votre écosystème digital',
          tier: 'bronze',
          icon: Shield,
          features: [
            'Audit technique approfondi',
            'Analyse concurrentielle',
            'Recommandations prioritaires',
            'Roadmap 12 mois',
            'Présentation direction',
            'Document stratégique',
            'Suivi 30 jours inclus',
            'Session Q&A équipe'
          ],
          notIncluded: [
            'Mise en œuvre',
            'Formation équipe',
            'Support continu',
            'Développement'
          ]
        },
        {
          id: 'consulting-transformation',
          name: 'Transformation Guidée',
          price: '9900€/mois',
          badge: 'Accompagnement',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Accompagnement transformation digitale avec consultant senior',
          tier: 'silver',
          icon: Rocket,
          popular: true,
          features: [
            'Consultant senior dédié',
            'Stratégie personnalisée',
            'Formation équipes complète',
            'Mise en œuvre guidée',
            'Outils digitaux inclus',
            'Reporting mensuel',
            'Support prioritaire',
            'Workshops mensuels',
            'Change management',
            'KPIs et métriques'
          ],
          notIncluded: [
            'Développement logiciel',
            'Équipe technique',
            'Matériel informatique'
          ]
        },
        {
          id: 'consulting-vip',
          name: 'VIP Enterprise',
          price: 'Sur devis',
          badge: 'Projets d\'envergure',
          badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
          description: 'Projets d\'envergure exceptionnelle avec équipe dédiée',
          tier: 'diamond',
          icon: Diamond,
          features: [
            'Équipe d\'experts dédiée',
            'Innovation technologique',
            'Projets complexes',
            'Support 24/7',
            'Déploiement international',
            'Success manager',
            'Garantie résultats',
            'Partenariat long terme',
            'R&D incluse'
          ]
        }
      ]
    }
  ];

  const currentService = services.find(s => s.id === activeService);

  const handlePackageSelect = (serviceId: string, packageId: string) => {
    setSelectedPackages(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === packageId ? '' : packageId
    }));
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return Shield;
      case 'silver': return Rocket;
      case 'gold': return Crown;
      case 'diamond': return Diamond;
      default: return Shield;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600';
      case 'silver': return 'text-gray-500';
      case 'gold': return 'text-yellow-500';
      case 'diamond': return 'text-purple-600';
      default: return 'text-gray-500';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande soumise:', { formData, selectedPackages });
    alert('✅ Votre demande a été envoyée ! Nous vous recontacterons sous 2h.');
    setShowContactForm(false);
  };

  return (
    <>
      <SEO
        title="Tarifs Techtrust 2025 | Solutions Digitales dès 15€/mois - Devis Gratuit"
        description="💰 Découvrez nos tarifs 2025 : Sites web dès 15€/mois, Growth Hacking IA dès 39€/mois, Community Management Pro dès 690€/mois. Solutions sur mesure disponibles. Devis gratuit sous 2h !"
        keywords="tarifs techtrust 2025, prix site web professionnel, growth hacking automatisé, community management expert, développement sur mesure, consulting digital, agence web france"
        canonicalUrl="https://www.tech-trust.fr/pricing"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col bg-gray-50">
        <NavbarPublic />
        
        <main className="flex-1">
          {/* Hero optimisé */}
          <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
                  🎯 Tarifs 2025 Transparents - Devis Gratuit
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Solutions Digitales 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Professionnelles</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Des <strong>solutions accessibles à tous</strong> : sites web dès 15€/mois, growth hacking IA dès 39€/mois. 
                  <br />✅ <strong>Sans engagement</strong> • ✅ <strong>Support français</strong> • ✅ <strong>Garantie satisfaction</strong>
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Badge variant="outline" className="bg-white">🏆 +2000 clients satisfaits</Badge>
                  <Badge variant="outline" className="bg-white">⚡ Déploiement en 48h</Badge>
                  <Badge variant="outline" className="bg-white">🇫🇷 Support français</Badge>
                  <Badge variant="outline" className="bg-white">💎 Qualité premium</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation services améliorée */}
          <section className="py-8 bg-white border-b sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3">
                {services.map((service) => {
                  const ServiceIcon = service.icon;
                  return (
                    <Button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      variant={activeService === service.id ? "default" : "outline"}
                      className={`${
                        activeService === service.id 
                          ? `bg-[#${service.color}] hover:bg-[#${service.color}]/90 text-white shadow-lg` 
                          : 'border-2 hover:border-[#45C7FF] hover:bg-blue-50'
                      } transition-all duration-200`}
                      size="lg"
                    >
                      <ServiceIcon className="w-5 h-5 mr-2" />
                      {service.title}
                    </Button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Service packages améliorés */}
          {currentService && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentService.title} - Choisissez votre formule
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {currentService.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {currentService.packages.map((pkg) => {
                    const TierIcon = getTierIcon(pkg.tier);
                    const isSelected = selectedPackages[currentService.id] === pkg.id;
                    
                    return (
                      <Card 
                        key={pkg.id} 
                        className={`relative transition-all duration-300 cursor-pointer ${
                          pkg.popular ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'hover:shadow-lg'
                        } ${isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
                        onClick={() => handlePackageSelect(currentService.id, pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <Badge className="bg-blue-500 text-white px-3 py-1 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Le plus populaire
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="text-center p-6">
                          <div className="flex items-center justify-center mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${currentService.color}/20 to-${currentService.color}/40 flex items-center justify-center`}>
                              <TierIcon className={`w-6 h-6 ${getTierColor(pkg.tier)}`} />
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                          
                          {pkg.badge && (
                            <Badge className={`mb-3 ${pkg.badgeColor}`}>
                              {pkg.badge}
                            </Badge>
                          )}

                          <div className="mb-3">
                            <div className="text-3xl font-bold text-gray-900">
                              {pkg.price}
                              {pkg.originalPrice && (
                                <span className="text-lg line-through text-gray-400 ml-2">
                                  {pkg.originalPrice}
                                </span>
                              )}
                            </div>
                            {pkg.setupFee && (
                              <div className="text-sm text-gray-500 mt-1">{pkg.setupFee}</div>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                        </CardHeader>

                        <CardContent className="px-6 pb-6">
                          <div className="space-y-3 mb-6">
                            {pkg.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                            
                            {pkg.notIncluded && pkg.notIncluded.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 opacity-50">
                                <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-500">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button 
                            className={`w-full ${
                              isSelected 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : pkg.popular 
                                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                  : 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                            }`}
                            size="lg"
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Sélectionné
                              </>
                            ) : (
                              `Choisir ${pkg.name}`
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Prêt à démarrer votre projet ?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Obtenez un devis personnalisé en moins de 2 heures
                    </p>
                    <Button 
                      onClick={() => setShowContactForm(true)}
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      disabled={Object.keys(selectedPackages).length === 0}
                    >
                      Obtenir mon devis gratuit
                      <Rocket className="w-4 h-4 ml-2" />
                    </Button>
                    {Object.keys(selectedPackages).length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Sélectionnez au moins une formule pour continuer
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />

        {/* Modal de contact amélioré */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Obtenez votre devis personnalisé
                  </h3>
                  <p className="text-gray-600">
                    Réponse garantie sous 2h pendant les heures ouvrées
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="jean@entreprise.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Décrivez votre projet
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Délais souhaités, spécificités techniques, objectifs..."
                    />
                  </div>

                  {/* Résumé sélection */}
                  {Object.keys(selectedPackages).length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Formules sélectionnées :
                      </h4>
                      {Object.entries(selectedPackages).map(([serviceId, packageId]) => {
                        const service = services.find(s => s.id === serviceId);
                        const pkg = service?.packages.find(p => p.id === packageId);
                        return pkg ? (
                          <div key={serviceId} className="text-sm text-gray-700">
                            • {service?.title} - {pkg.name} ({pkg.price})
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        required
                        id="acceptsTerms"
                        checked={formData.acceptsTerms}
                        onChange={(e) => setFormData({...formData, acceptsTerms: e.target.checked})}
                        className="mt-1"
                      />
                      <label htmlFor="acceptsTerms" className="text-sm text-gray-700">
                        J'accepte les <a href="/terms" className="text-blue-500 hover:underline">conditions d'utilisation</a> et autorise Techtrust à me recontacter. *
                      </label>
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="acceptsMarketing"
                        checked={formData.acceptsMarketing}
                        onChange={(e) => setFormData({...formData, acceptsMarketing: e.target.checked})}
                        className="mt-1"
                      />
                      <label htmlFor="acceptsMarketing" className="text-sm text-gray-700">
                        Je souhaite recevoir les actualités et offres spéciales de Techtrust
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      Envoyer ma demande
                      <Rocket className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Pricing;
