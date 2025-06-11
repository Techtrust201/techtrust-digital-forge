
import React, { useState } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Crown, X, Plus, ShoppingCart, Mail, Globe, Code, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServicePackage {
  id: string;
  name: string;
  price: string;
  setupFee?: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  quantities?: { [key: string]: string | number };
}

interface SelectedPackage extends ServicePackage {
  serviceTitle: string;
  serviceCategory: string;
  serviceColor: string;
}

const Pricing = () => {
  const [activeService, setActiveService] = useState<string>('website');
  const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalInfo: '',
    acceptsData: false
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tarifs Techtrust 2025",
    "description": "Découvrez nos tarifs transparents 2025 pour nos outils IA de growth hacking automatisés et services digitaux professionnels",
    "url": "https://www.tech-trust.fr/pricing"
  };

  const services = [
    {
      id: 'website',
      title: 'Création Site Web',
      icon: Globe,
      color: '45C7FF',
      packages: [
        {
          id: 'website-starter',
          name: 'Starter',
          price: '15€/month',
          setupFee: '600€ setup',
          description: 'Les fonctionnalités essentielles pour démarrer votre business',
          features: ['Site web personnalisé', 'Nom de domaine personnalisé', 'Design responsive', 'Site web multilingue', 'Certificat SSL', 'Code QR'],
          notIncluded: ['Rapports', 'Retouche site web', 'Optimisation SEO'],
          quantities: {
            'Nombre de pages': 2,
            'Langues disponibles': 1,
            'Retouche site web': 1,
          }
        },
        {
          id: 'website-advanced',
          name: 'Advanced',
          price: '25€/month',
          setupFee: '800€ setup',
          description: 'Le plan le plus choisi par nos clients Techtrust',
          features: ['Site web personnalisé', 'Nom de domaine personnalisé', 'Design responsive', 'Site web multilingue', 'Certificat SSL', 'Code QR', 'Rapports', 'Retouche site web'],
          notIncluded: ['Optimisation SEO avancée'],
          popular: true,
          quantities: {
            'Nombre de pages': 4,
            'Langues disponibles': 2,
            'Retouche site web': 2,
          }
        },
        {
          id: 'website-premium',
          name: 'Premium',
          price: '30€/month',
          setupFee: '1000€ setup',
          description: 'Le plan ultime pour développer votre business en ligne',
          features: ['Site web personnalisé', 'Nom de domaine personnalisé', 'Design responsive', 'Site web multilingue', 'Certificat SSL', 'Code QR', 'Rapports', 'Retouche site web', 'Optimisation SEO'],
          quantities: {
            'Nombre de pages': 6,
            'Langues disponibles': 2,
            'Retouche site web': 3,
          }
        }
      ]
    },
    {
      id: 'growth-hacking',
      title: 'Growth Hacking IA',
      icon: Zap,
      color: '8B5CF6',
      packages: [
        {
          id: 'growth-easy',
          name: 'Easy',
          price: '35€/month',
          description: 'Couvre vos besoins publicitaires de base',
          features: ['Profil Google Business', 'Boîte mail professionnelle', 'Rapports', 'Google Ads', 'Publication Google', 'Gestion des contacts'],
          notIncluded: ['Outil campagne email', 'Outil campagne SMS', 'Outil génération de leads'],
          quantities: {
            'Publications réseaux sociaux': 1,
            'Google Ads': 1,
            'Publication Google': '—',
          }
        },
        {
          id: 'growth-medium',
          name: 'Medium',
          price: '45€/month',
          description: 'Gérez les contacts et envoyez des campagnes marketing',
          features: ['Profil Google Business', 'Boîte mail professionnelle', 'Rapports', 'Google Ads', 'Publication Google', 'Gestion des contacts', 'Outil campagne email', 'Outil campagne SMS'],
          notIncluded: ['Outil génération de leads avancé'],
          popular: true,
          quantities: {
            'Publications réseaux sociaux': 2,
            'Google Ads': 2,
            'Publication Google': 1,
          }
        },
        {
          id: 'growth-high',
          name: 'High',
          price: '50€/month',
          description: 'Faites de la publicité partout et recherchez des leads',
          features: ['Profil Google Business', 'Boîte mail professionnelle', 'Rapports', 'Google Ads', 'Publication Google', 'Gestion des contacts', 'Outil campagne email', 'Outil campagne SMS', 'Outil génération de leads'],
          quantities: {
            'Publications réseaux sociaux': 3,
            'Google Ads': 3,
            'Publication Google': 1,
          }
        }
      ]
    },
    {
      id: 'community-management',
      title: 'Community Management Pro',
      icon: Users,
      color: 'EC4899',
      packages: [
        {
          id: 'community-starter',
          name: 'Starter',
          price: '890€/month',
          description: 'Gestion professionnelle de base',
          features: ['Community manager dédié', 'Stratégie de contenu', 'Création graphique', 'Gestion 3 réseaux', 'Réponse commentaires', 'Reporting mensuel'],
          notIncluded: ['Vidéos professionnelles', 'Campagnes publicitaires', 'Marketing d\'influence'],
          quantities: {
            'Réseaux sociaux gérés': 3,
            'Publications par semaine': 10,
            'Stories par semaine': 7,
            'Réels/vidéos par mois': 2,
          }
        },
        {
          id: 'community-business',
          name: 'Business',
          price: '1690€/month',
          description: 'Solution complète avec stratégie avancée',
          features: ['Équipe dédiée', 'Stratégie personnalisée', 'Création contenu premium', 'Gestion tous réseaux', 'Vidéos professionnelles', 'Campagnes publicitaires', 'Reporting hebdomadaire'],
          notIncluded: ['Marketing d\'influence premium'],
          popular: true,
          quantities: {
            'Réseaux sociaux gérés': 'Tous',
            'Publications par semaine': 20,
            'Stories par semaine': 15,
            'Réels/vidéos par mois': 8,
          }
        },
        {
          id: 'community-premium',
          name: 'Premium',
          price: 'Sur devis',
          description: 'Solution haut de gamme avec influence',
          features: ['Équipe senior dédiée', 'Stratégie d\'influence', 'Contenu premium + vidéos', 'Gestion complète', 'Événements digitaux', 'Partenariats influenceurs', 'Reporting temps réel'],
          quantities: {
            'Réseaux sociaux gérés': 'Tous',
            'Publications par semaine': 'Illimité',
            'Stories par semaine': 'Illimité',
            'Réels/vidéos par mois': 'Illimité',
          }
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Consulting Digital',
      icon: Lightbulb,
      color: 'F59E0B',
      packages: [
        {
          id: 'consulting-audit',
          name: 'Audit Digital',
          price: '2500€',
          description: 'Diagnostic complet de votre écosystème digital',
          features: ['Audit technique complet', 'Analyse concurrentielle', 'Recommandations stratégiques', 'Roadmap 12 mois', 'Présentation exécutive', 'Suivi 1 mois'],
          notIncluded: ['Mise en œuvre', 'Formation équipe', 'Support continu'],
          quantities: {
            'Durée d\'intervention': '2 semaines',
            'Livrables': 'Rapport + Roadmap',
            'Suivi inclus': '1 mois',
          }
        },
        {
          id: 'consulting-transformation',
          name: 'Transformation Guidée',
          price: '8500€/mois',
          description: 'Accompagnement transformation digitale complète',
          features: ['Consultant senior dédié', 'Stratégie personnalisée', 'Formation équipes', 'Mise en œuvre guidée', 'Outils digitaux', 'Reporting mensuel', 'Support prioritaire'],
          notIncluded: ['Développement logiciel'],
          popular: true,
          quantities: {
            'Durée engagement': '6-12 mois',
            'Consultant dédié': '1 senior',
            'Formations incluses': '5 sessions',
          }
        },
        {
          id: 'consulting-premium',
          name: 'Premium VIP',
          price: 'Sur devis',
          description: 'Projets d\'envergure exceptionnelle',
          features: ['Équipe d\'experts dédiée', 'Innovation technologique', 'Projets complexes', 'Support 24/7', 'Déploiement global', 'Success manager', 'Garantie résultats'],
          quantities: {
            'Durée engagement': 'Sur mesure',
            'Équipe dédiée': 'Complète',
            'Support': '24/7',
          }
        }
      ]
    },
    {
      id: 'solutions-custom',
      title: 'Solutions Sur Mesure',
      icon: Code,
      color: '10B981',
      packages: [
        {
          id: 'solutions-app',
          name: 'Application Simple',
          price: '8900€',
          description: 'Application métier basique',
          features: ['Application web responsive', 'Interface d\'administration', 'Base de données', 'Authentification utilisateurs', 'Formation équipe', 'Documentation complète'],
          notIncluded: ['Application mobile', 'Intégrations API', 'Support avancé'],
          quantities: {
            'Modules inclus': '5 max',
            'Utilisateurs': '50 max',
            'Formation': '1 session',
          }
        },
        {
          id: 'solutions-crm',
          name: 'CRM/ERP Custom',
          price: '24900€',
          description: 'Système de gestion complet',
          features: ['CRM/ERP sur mesure', 'Modules illimités', 'Application mobile', 'Intégrations API', 'Rapports avancés', 'Formation complète', 'Maintenance 1 an'],
          notIncluded: ['Hébergement cloud premium'],
          popular: true,
          quantities: {
            'Modules inclus': 'Illimités',
            'Utilisateurs': '500 max',
            'Formation': '3 sessions',
          }
        },
        {
          id: 'solutions-enterprise',
          name: 'Plateforme Enterprise',
          price: 'Sur devis',
          description: 'Plateforme complexe d\'entreprise',
          features: ['Architecture sur mesure', 'Scalabilité illimitée', 'Sécurité renforcée', 'Équipe dédiée', 'Support premium', 'Évolutions incluses', 'SLA garanti'],
          quantities: {
            'Modules inclus': 'Illimités',
            'Utilisateurs': 'Illimités',
            'Support': 'Dédié 24/7',
          }
        }
      ]
    }
  ];

  const serviceButtons = [
    { id: 'website', title: 'Website creation', icon: Globe },
    { id: 'growth-hacking', title: 'Growth hacking', icon: Zap },
    { id: 'community-management', title: 'Community Management', icon: Users },
    { id: 'consulting', title: 'Consulting Digital', icon: Lightbulb },
    { id: 'solutions-custom', title: 'Software development', icon: Code }
  ];

  const currentService = services.find(s => s.id === activeService);

  const addToCart = (servicePackage: ServicePackage, serviceTitle: string, serviceCategory: string, serviceColor: string) => {
    const newPackage: SelectedPackage = {
      ...servicePackage,
      serviceTitle,
      serviceCategory,
      serviceColor
    };
    setSelectedPackages([...selectedPackages, newPackage]);
    setIsCartVisible(true);
  };

  const removeFromCart = (packageId: string) => {
    setSelectedPackages(selectedPackages.filter(pkg => pkg.id !== packageId));
  };

  const getTotalEstimate = () => {
    let total = 0;
    selectedPackages.forEach(pkg => {
      const price = pkg.price.replace(/[^0-9]/g, '');
      if (price) {
        total += parseInt(price);
      }
    });
    return total;
  };

  const handleSubmitProject = () => {
    if (selectedPackages.length === 0) {
      alert('Veuillez sélectionner au moins un service');
      return;
    }
    setShowContactForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptsData) {
      alert('Veuillez accepter la collecte des données');
      return;
    }
    
    console.log('Projet soumis:', { formData, selectedPackages });
    alert('✅ Votre projet a été envoyé avec succès ! Nous vous recontacterons sous 24h.');
    
    setSelectedPackages([]);
    setShowContactForm(false);
    setIsCartVisible(false);
    setFormData({ name: '', email: '', phone: '', additionalInfo: '', acceptsData: false });
  };

  return (
    <>
      <SEO
        title="Tarifs 2025 | Solutions IA & Digitales dès 35€/mois - Techtrust"
        description="💰 Tarifs transparents 2025 ! Outils IA growth hacking dès 35€/mois, sites web dès 15€/mois. Community management pro, consulting digital. Devis gratuit !"
        keywords="tarifs techtrust 2025, prix outils ia growth hacking, community management professionnel, consulting digital, solutions sur mesure, tarif accessible"
        canonicalUrl="https://www.tech-trust.fr/pricing"
        structuredData={structuredData}
      />

      <div className="flex min-h-screen flex-col">
        <NavbarPublic />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#374151] mb-6">
                  Techtrust <span className="text-[#45C7FF]">Pricing</span>
                </h1>
                <p className="text-xl text-[#374151] mb-8">
                  Chez Techtrust, nos tarifs sont complètement transparents : toutes les fonctionnalités sont listées ci-dessous et tous les plans vous donneront accès à notre application web. Depuis notre app, vous pourrez suivre les performances de votre site web et de vos réseaux sociaux, l'efficacité de nos solutions.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4" />
                  Devis gratuit - Paiement flexible
                </div>
              </div>
            </div>
          </section>

          {/* Service Selection */}
          <section className="py-12 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {serviceButtons.map((service) => {
                  const ServiceIcon = service.icon;
                  return (
                    <Button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      variant={activeService === service.id ? "default" : "outline"}
                      className={`${activeService === service.id ? 'bg-[#45C7FF] hover:bg-[#45C7FF]/90 text-white' : 'border-2 border-[#45C7FF] text-[#45C7FF] hover:bg-[#45C7FF] hover:text-white'}`}
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

          {/* Service Details */}
          {currentService && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#374151] mb-4">
                    Compare nos plans {currentService.title} et fais ton choix !
                  </h2>
                </div>

                {/* Package Selection */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {currentService.packages.map((pkg) => (
                    <Card key={pkg.id} className={`relative ${pkg.popular ? `border-[#${currentService.color}] shadow-xl scale-105` : 'border-gray-200'} transition-all duration-300 h-full flex flex-col`}>
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className={`bg-[#${currentService.color}] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1`}>
                            <Star className="w-4 h-4" />
                            {pkg.name}
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                            <input
                              type="radio"
                              name={`${currentService.id}-package`}
                              className="w-6 h-6"
                              style={{ accentColor: `#${currentService.color}` }}
                            />
                          </div>
                          <h4 className="text-xl font-bold text-[#374151] mb-2">{pkg.name}</h4>
                          <div className="mb-2">
                            <span className={`text-3xl font-bold text-[#${currentService.color}]`}>{pkg.price}</span>
                            {pkg.setupFee && (
                              <div className="text-sm text-gray-500 mt-1">{pkg.setupFee}</div>
                            )}
                          </div>
                          <p className="text-[#374151] text-sm">{pkg.description}</p>
                        </div>

                        <div className="flex-1">
                          <Button 
                            onClick={() => addToCart(pkg, currentService.title, currentService.id, currentService.color)}
                            className={`w-full mb-6 ${pkg.popular ? `bg-[#${currentService.color}] hover:bg-[#${currentService.color}]/90` : `border-2 border-[#${currentService.color}] text-[#${currentService.color}] hover:bg-[#${currentService.color}] hover:text-white bg-transparent`}`}
                            size="lg"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Sélectionner ce plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Feature Comparison Table */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-[#374151] mb-6">
                    Les contenus de l'abonnement mensuel
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-medium text-[#374151]"></th>
                          {currentService.packages.map((pkg) => (
                            <th key={pkg.id} className="text-center py-4 px-4">
                              <div className={`text-lg font-bold text-[#${currentService.color}]`}>
                                {pkg.name}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Features rows */}
                        {currentService.packages[0].features.map((feature, idx) => (
                          <tr key={idx} className="border-b border-gray-200">
                            <td className="py-4 px-4 font-medium text-[#374151]">{feature}</td>
                            {currentService.packages.map((pkg) => (
                              <td key={pkg.id} className="text-center py-4 px-4">
                                {pkg.features.includes(feature) ? (
                                  <Check className={`w-5 h-5 text-[#${currentService.color}] mx-auto`} />
                                ) : (
                                  <X className="w-5 h-5 text-gray-400 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                        
                        {/* Quantities rows */}
                        {currentService.packages[0].quantities && Object.keys(currentService.packages[0].quantities).map((quantityKey) => (
                          <tr key={quantityKey} className="border-b border-gray-200">
                            <td className="py-4 px-4 font-medium text-[#374151]">{quantityKey}</td>
                            {currentService.packages.map((pkg) => (
                              <td key={pkg.id} className="text-center py-4 px-4 font-medium">
                                {pkg.quantities?.[quantityKey] || '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="text-center mt-12">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#374151] mb-4">ou</h3>
                    <p className="text-[#374151]">
                      You can subscribe to<br />
                      additional options if you wish to
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    {services.filter(s => s.id !== currentService.id).map((service) => (
                      <Button
                        key={service.id}
                        onClick={() => setActiveService(service.id)}
                        variant="outline"
                        className="border-2 border-[#45C7FF] text-[#45C7FF] hover:bg-[#45C7FF] hover:text-white"
                      >
                        {service.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />

        {/* Panier flottant */}
        {selectedPackages.length > 0 && (
          <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <Card className="w-80 shadow-xl border-[#45C7FF]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#374151]">Mon projet ({selectedPackages.length})</h4>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsCartVisible(!isCartVisible)}
                    >
                      {isCartVisible ? '−' : '+'}
                    </Button>
                  </div>
                </div>

                {isCartVisible && (
                  <>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {selectedPackages.map((pkg) => (
                        <div key={pkg.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{pkg.serviceTitle}</div>
                            <div className="text-xs text-gray-600">{pkg.name} - {pkg.price}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(pkg.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleSubmitProject}
                      className="w-full bg-[#45C7FF] hover:bg-[#45C7FF]/90 text-white"
                      size="lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Soumettre mon projet
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de contact */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#374151] mb-4">Finaliser votre projet</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45C7FF] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45C7FF] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45C7FF] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Informations complémentaires</label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45C7FF] focus:border-transparent"
                      placeholder="Délais souhaités, spécificités..."
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      required
                      id="acceptsData"
                      checked={formData.acceptsData}
                      onChange={(e) => setFormData({...formData, acceptsData: e.target.checked})}
                      className="mt-1"
                    />
                    <label htmlFor="acceptsData" className="text-sm text-[#374151]">
                      J'autorise Techtrust à collecter mes données afin de me répondre. *
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
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
                      className="flex-1 bg-[#45C7FF] hover:bg-[#45C7FF]/90 text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer
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
