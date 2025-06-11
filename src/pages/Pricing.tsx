
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Shield, Rocket, Diamond, X } from 'lucide-react';
import SEO from '@/components/SEO';

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: string}>({});
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const websitePackages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 899,
      icon: Shield,
      color: 'from-amber-500 to-orange-500',
      features: [
        'Site vitrine 5 pages',
        'Design responsive',
        'Optimisation SEO de base',
        'Formulaire de contact',
        'Hébergement 1 an inclus',
        'SSL gratuit',
        'Support email'
      ],
      limitations: [
        'Pas de blog intégré',
        'Pas de e-commerce',
        'Trafic limité à 10k/mois'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: 1599,
      icon: Rocket,
      color: 'from-blue-500 to-purple-500',
      popular: true,
      features: [
        'Site vitrine 10 pages',
        'Blog intégré',
        'Design premium personnalisé',
        'SEO avancé',
        'Formulaires avancés',
        'Analytics intégrés',
        'Hébergement 1 an inclus',
        'Support prioritaire'
      ],
      limitations: [
        'E-commerce basique uniquement',
        'Trafic limité à 50k/mois'
      ]
    },
    {
      id: 'premium',
      name: 'Premium E-commerce',
      price: 2999,
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Site e-commerce complet',
        'Pages illimitées',
        'Design sur mesure',
        'SEO premium',
        'Paiements sécurisés',
        'Gestion stock',
        'Multi-devises',
        'Support 24/7',
        'Formation incluse'
      ],
      limitations: []
    }
  ];

  const growthPackages = [
    {
      id: 'easy',
      name: 'Easy Growth',
      price: 299,
      icon: Zap,
      color: 'from-green-500 to-teal-500',
      features: [
        '500 leads qualifiés/mois',
        'Prospection automatisée',
        '2 campagnes email/mois',
        'Analytics de base',
        'Support email'
      ],
      limitations: [
        'Pas de SMS marketing',
        'Intégrations limitées'
      ]
    },
    {
      id: 'medium',
      name: 'Medium Growth',
      price: 599,
      icon: Star,
      color: 'from-blue-500 to-indigo-500',
      popular: true,
      features: [
        '2000 leads qualifiés/mois',
        'IA de prospection avancée',
        'Campagnes illimitées',
        '500 SMS/mois',
        'A/B testing',
        'Analytics avancés',
        'Support prioritaire'
      ],
      limitations: [
        'Intégrations premium limitées'
      ]
    },
    {
      id: 'high',
      name: 'High Performance',
      price: 1299,
      icon: Diamond,
      color: 'from-purple-500 to-violet-500',
      features: [
        'Leads illimités',
        'IA ultra-performante',
        'Multi-canal (Email, SMS, LinkedIn)',
        'Automatisations complexes',
        'Attribution tracking',
        'Support dédié',
        'Consultant assigné'
      ],
      limitations: []
    }
  ];

  const communityPackages = [
    {
      id: 'basic',
      name: 'Community Basic',
      price: 199,
      icon: Shield,
      color: 'from-pink-500 to-rose-500',
      features: [
        '2 réseaux sociaux',
        '15 posts/mois',
        'Visuels inclus',
        'Planification automatique',
        'Rapport mensuel'
      ],
      limitations: [
        'Pas de stories',
        'Community management limité'
      ]
    },
    {
      id: 'advanced',
      name: 'Community Pro',
      price: 399,
      icon: Star,
      color: 'from-indigo-500 to-purple-500',
      popular: true,
      features: [
        '4 réseaux sociaux',
        '30 posts/mois',
        'Stories incluses',
        'Community management',
        'Campagnes publicitaires',
        'Analytics détaillés'
      ],
      limitations: [
        'Influence marketing limité'
      ]
    },
    {
      id: 'expert',
      name: 'Community Expert',
      price: 799,
      icon: Crown,
      color: 'from-violet-500 to-purple-500',
      features: [
        'Réseaux illimités',
        'Posts illimités',
        'Influence marketing',
        'Campagnes premium',
        'Stratégie personnalisée',
        'Community manager dédié'
      ],
      limitations: []
    }
  ];

  const consultingPackages = [
    {
      id: 'audit',
      name: 'Audit Digital',
      price: 499,
      icon: Shield,
      color: 'from-emerald-500 to-green-500',
      features: [
        'Audit complet 360°',
        'Plan d\'action détaillé',
        'Recommandations prioritaires',
        'Présentation 2h',
        'Suivi 1 mois'
      ],
      limitations: [
        'Pas de mise en œuvre'
      ]
    },
    {
      id: 'strategy',
      name: 'Stratégie Digital',
      price: 999,
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
      popular: true,
      features: [
        'Stratégie sur mesure',
        'Roadmap 12 mois',
        'KPIs personnalisés',
        'Formation équipe',
        'Suivi trimestriel'
      ],
      limitations: [
        'Mise en œuvre externe'
      ]
    },
    {
      id: 'accompagnement',
      name: 'Accompagnement',
      price: 1999,
      icon: Diamond,
      color: 'from-purple-500 to-indigo-500',
      features: [
        'Consultant dédié',
        'Mise en œuvre complète',
        'Formation continue',
        'Support illimité',
        'Résultats garantis'
      ],
      limitations: []
    }
  ];

  const handlePackageSelect = (category: string, packageId: string) => {
    setSelectedPackages(prev => ({
      ...prev,
      [category]: packageId
    }));
  };

  const getTotalPrice = () => {
    let total = 0;
    let packageCount = 0;
    
    Object.entries(selectedPackages).forEach(([category, packageId]) => {
      const packages = category === 'website' ? websitePackages :
                     category === 'growth' ? growthPackages :
                     category === 'community' ? communityPackages :
                     consultingPackages;
      
      const selectedPackage = packages.find(p => p.id === packageId);
      if (selectedPackage) {
        total += selectedPackage.price;
        packageCount++;
      }
    });

    // Réductions pour packages multiples
    let discount = 0;
    if (packageCount >= 3) discount = 0.15; // -15%
    else if (packageCount >= 2) discount = 0.10; // -10%

    const finalPrice = total * (1 - discount);
    return { total, finalPrice, discount: discount * 100, packageCount };
  };

  const renderPackageCard = (pkg: any, category: string) => {
    const Icon = pkg.icon;
    const isSelected = selectedPackages[category] === pkg.id;
    
    return (
      <Card 
        key={pkg.id} 
        className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
          isSelected ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
        } ${pkg.popular ? 'border-2 border-blue-500' : ''}`}
        onClick={() => handlePackageSelect(category, pkg.id)}
      >
        {pkg.popular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
            ⭐ Plus populaire
          </Badge>
        )}
        
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
          <div className="text-4xl font-bold text-blue-600">
            {pkg.price}€
            <span className="text-sm font-normal text-gray-500">/projet</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-600 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Inclus :
            </h4>
            {pkg.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          {pkg.limitations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                <X className="w-4 h-4" />
                Limitations :
              </h4>
              {pkg.limitations.map((limitation: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{limitation}</span>
                </div>
              ))}
            </div>
          )}
          
          <Button 
            className={`w-full ${isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {isSelected ? '✓ Sélectionné' : 'Sélectionner'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const priceInfo = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO 
        title="Tarifs et Packages - Solutions Digitales Techtrust 2025"
        description="Découvrez nos packages : Sites web (899€-2999€), Growth Hacking IA (299€-1299€), Community Management (199€-799€), Consulting Digital (499€-1999€). Réductions jusqu'à -15% sur packages multiples."
        keywords="tarifs techtrust, prix site web, growth hacking prix, community management tarif, consulting digital prix, package digital, réduction techtrust"
        canonicalUrl="https://www.tech-trust.fr/pricing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Solutions Digitales Techtrust",
          "description": "Packages complets pour votre transformation digitale",
          "offers": [
            {
              "@type": "Offer",
              "name": "Site Web Starter",
              "price": "899",
              "priceCurrency": "EUR"
            },
            {
              "@type": "Offer", 
              "name": "Growth Hacking IA",
              "price": "299",
              "priceCurrency": "EUR"
            }
          ]
        }}
      />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Nos Packages 2025 🚀
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez les solutions parfaites pour votre business. Réductions automatiques sur packages multiples !
          </p>
        </div>

        {/* Sites Web */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Sites Web & E-commerce
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {websitePackages.map(pkg => renderPackageCard(pkg, 'website'))}
          </div>
        </section>

        {/* Growth Hacking */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-green-500" />
            Growth Hacking IA
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {growthPackages.map(pkg => renderPackageCard(pkg, 'growth'))}
          </div>
        </section>

        {/* Community Management */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-pink-500" />
            Community Management
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {communityPackages.map(pkg => renderPackageCard(pkg, 'community'))}
          </div>
        </section>

        {/* Consulting */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <Diamond className="w-8 h-8 text-purple-500" />
            Consulting Digital
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {consultingPackages.map(pkg => renderPackageCard(pkg, 'consulting'))}
          </div>
        </section>

        {/* Récapitulatif */}
        {Object.keys(selectedPackages).length > 0 && (
          <Card className="sticky bottom-6 bg-white/95 backdrop-blur-lg border-2 border-blue-200 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    🛒 Votre sélection ({priceInfo.packageCount} package{priceInfo.packageCount > 1 ? 's' : ''})
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(selectedPackages).map(([category, packageId]) => {
                      const packages = category === 'website' ? websitePackages :
                                     category === 'growth' ? growthPackages :
                                     category === 'community' ? communityPackages :
                                     consultingPackages;
                      const pkg = packages.find(p => p.id === packageId);
                      return pkg ? (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-gray-700">{pkg.name}</span>
                          <span className="font-semibold">{pkg.price}€</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  {priceInfo.discount > 0 && (
                    <div className="mb-2">
                      <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                        🎉 -{priceInfo.discount}% de réduction !
                      </Badge>
                    </div>
                  )}
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {priceInfo.finalPrice.toLocaleString()}€
                    {priceInfo.discount > 0 && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {priceInfo.total.toLocaleString()}€
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => setShowQuoteForm(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
                  >
                    Demander un devis gratuit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">Prêt à booster votre business ? 🎯</h2>
          <p className="text-lg text-gray-600 mb-8">
            Nos experts vous accompagnent dans votre transformation digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
              📞 Appel gratuit 15min
            </Button>
            <Button variant="outline" className="px-8 py-3">
              💬 Chat en direct
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Devis */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Demande de devis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input 
                type="email" 
                placeholder="Votre email professionnel"
                className="w-full p-3 border rounded-lg"
              />
              <textarea 
                placeholder="Parlez-nous de votre projet..."
                className="w-full p-3 border rounded-lg h-24"
              />
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    alert('🎉 Devis envoyé ! Nous vous contacterons sous 24h.');
                    setShowQuoteForm(false);
                  }}
                >
                  Envoyer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowQuoteForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Pricing;
