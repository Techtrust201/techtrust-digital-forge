
import React, { useState } from 'react';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Crown, X, Plus, ShoppingCart, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
}

interface SelectedPackage extends ServicePackage {
  serviceTitle: string;
  serviceCategory: string;
}

const Pricing = () => {
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
      icon: '🌐',
      color: '45C7FF',
      packages: [
        {
          id: 'website-starter',
          name: 'Site Vitrine',
          price: '990€',
          description: 'Site professionnel simple et efficace',
          features: ['Design responsive', 'Jusqu\'à 5 pages', 'Formulaire de contact', 'Optimisation SEO de base', 'Hébergement 1 an inclus'],
          notIncluded: ['E-commerce', 'Blog', 'Maintenance']
        },
        {
          id: 'website-business',
          name: 'Site Business',
          price: '2490€',
          description: 'Solution complète pour entreprises',
          features: ['Design sur mesure', 'Jusqu\'à 15 pages', 'Blog intégré', 'SEO avancé', 'Formulaires avancés', 'Analytics', 'Maintenance 6 mois'],
          popular: true
        },
        {
          id: 'website-ecommerce',
          name: 'E-commerce Premium',
          price: '4990€',
          description: 'Boutique en ligne complète',
          features: ['Boutique complète', 'Gestion produits illimitée', 'Paiement sécurisé', 'Gestion commandes', 'SEO e-commerce', 'Formation incluse', 'Maintenance 1 an']
        }
      ]
    },
    {
      id: 'growth-hacking',
      title: 'Growth Hacking IA',
      icon: '🤖',
      color: '8B5CF6',
      packages: [
        {
          id: 'growth-starter',
          name: 'IA Starter',
          price: '97€/mois',
          description: 'Outils IA de base accessibles à tous',
          features: ['Prospection IA automatisée', 'Community management 2 réseaux', 'Email marketing basique', 'Analytics simples', 'Support email'],
          notIncluded: ['CRM avancé', 'Intégrations multiples', 'Support prioritaire']
        },
        {
          id: 'growth-business',
          name: 'IA Business',
          price: '297€/mois',
          description: 'Solution complète pour PME',
          features: ['Tous outils IA avancés', 'Community management 5 réseaux', 'CRM intelligent', 'Automatisation complète', 'Rapports détaillés', 'Support prioritaire'],
          popular: true
        },
        {
          id: 'growth-enterprise',
          name: 'IA Enterprise',
          price: 'Sur devis',
          description: 'Solution sur mesure pour grandes entreprises',
          features: ['IA personnalisée', 'Intégrations illimitées', 'Équipe dédiée', 'Formation complète', 'Support 24/7', 'API personnalisée']
        }
      ]
    },
    {
      id: 'community-pro',
      title: 'Community Management Pro',
      icon: '👥',
      color: 'EC4899',
      packages: [
        {
          id: 'community-starter',
          name: 'Community Starter',
          price: '890€/mois',
          description: 'Gestion professionnelle de base',
          features: ['Community manager dédié', 'Gestion 3 réseaux', 'Création contenu', 'Reporting mensuel', 'Réponse aux commentaires'],
          notIncluded: ['Vidéos', 'Publicités', 'Influence']
        },
        {
          id: 'community-business',
          name: 'Community Business',
          price: '1690€/mois',
          description: 'Solution complète avec stratégie',
          features: ['Équipe complète', 'Gestion tous réseaux', 'Contenu premium + vidéos', 'Stratégie personnalisée', 'Gestion publicités', 'Reporting hebdomadaire'],
          popular: true
        },
        {
          id: 'community-premium',
          name: 'Community Premium',
          price: 'Sur devis',
          description: 'Solution haut de gamme',
          features: ['Équipe senior dédiée', 'Stratégie d\'influence', 'Événements digitaux', 'Partenariats influenceurs', 'Reporting temps réel', 'Accompagnement stratégique']
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Consulting Digital',
      icon: '💡',
      color: 'F59E0B',
      packages: [
        {
          id: 'consulting-audit',
          name: 'Audit Digital',
          price: '2500€',
          description: 'Diagnostic complet de votre digital',
          features: ['Audit complet', 'Recommandations détaillées', 'Roadmap 12 mois', 'Présentation exécutive', 'Suivi 1 mois'],
          notIncluded: ['Mise en œuvre', 'Formation', 'Support continu']
        },
        {
          id: 'consulting-transformation',
          name: 'Transformation Guidée',
          price: '8500€/mois',
          description: 'Accompagnement transformation complète',
          features: ['Consultant senior dédié', 'Stratégie personnalisée', 'Formation équipes', 'Mise en œuvre guidée', 'Reporting mensuel', 'Support prioritaire'],
          popular: true
        },
        {
          id: 'consulting-premium',
          name: 'Premium VIP',
          price: 'Sur devis',
          description: 'Accompagnement d\'exception',
          features: ['Équipe d\'experts dédiée', 'Projets d\'envergure', 'Innovation technologique', 'Support 24/7', 'Déploiement global', 'Success manager']
        }
      ]
    },
    {
      id: 'solutions-custom',
      title: 'Solutions Sur Mesure',
      icon: '⚙️',
      color: '10B981',
      packages: [
        {
          id: 'solutions-app',
          name: 'Application Simple',
          price: '8900€',
          description: 'Application métier basique',
          features: ['Application web', 'Jusqu\'à 5 modules', 'Base de données', 'Interface admin', 'Formation utilisateurs'],
          notIncluded: ['Mobile app', 'Intégrations', 'API']
        },
        {
          id: 'solutions-crm',
          name: 'CRM/ERP Custom',
          price: '24900€',
          description: 'Système de gestion complet',
          features: ['CRM/ERP sur mesure', 'Modules illimités', 'Intégrations multiples', 'App mobile', 'Formation complète', 'Maintenance 1 an'],
          popular: true
        },
        {
          id: 'solutions-enterprise',
          name: 'Plateforme Enterprise',
          price: 'Sur devis',
          description: 'Plateforme complexe d\'entreprise',
          features: ['Architecture sur mesure', 'Scalabilité illimitée', 'Sécurité renforcée', 'Équipe dédiée', 'Support premium', 'Évolutions incluses']
        }
      ]
    }
  ];

  const addToCart = (servicePackage: ServicePackage, serviceTitle: string, serviceCategory: string) => {
    const newPackage: SelectedPackage = {
      ...servicePackage,
      serviceTitle,
      serviceCategory
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
    
    // Simulation d'envoi d'email
    console.log('Projet soumis:', { formData, selectedPackages });
    
    // Animation de succès
    alert('✅ Votre projet a été envoyé avec succès ! Nous vous recontacterons sous 24h.');
    
    // Reset
    setSelectedPackages([]);
    setShowContactForm(false);
    setIsCartVisible(false);
    setFormData({ name: '', email: '', phone: '', additionalInfo: '', acceptsData: false });
  };

  return (
    <>
      <SEO
        title="Tarifs 2025 | Solutions IA & Digitales dès 97€/mois - Techtrust"
        description="💰 Tarifs transparents 2025 ! Outils IA growth hacking dès 97€/mois, sites web dès 990€. Community management pro, consulting digital. Devis gratuit !"
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
                  Tarifs <span className="text-[#45C7FF]">2025</span> Transparents
                </h1>
                <p className="text-xl text-[#374151] mb-8">
                  Des solutions IA accessibles à tous pour automatiser votre croissance. 
                  Des tarifs clairs, sans surprise, avec possibilité de combiner plusieurs services.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4" />
                  Devis gratuit - Paiement flexible
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#374151] mb-4">
                  Choisissez et Combinez vos Solutions
                </h2>
                <p className="text-[#374151] max-w-2xl mx-auto">
                  Sélectionnez les services qui correspondent à vos besoins. 
                  Vous pouvez combiner plusieurs solutions pour un accompagnement complet.
                </p>
              </div>

              <div className="space-y-16">
                {services.map((service) => (
                  <div key={service.id} className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-4xl">{service.icon}</span>
                        <h3 className="text-2xl font-bold text-[#374151]">{service.title}</h3>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {service.packages.map((pkg) => (
                        <Card key={pkg.id} className={`relative ${pkg.popular ? `border-[#${service.color}] shadow-xl scale-105` : 'border-gray-200'} transition-all duration-300 h-full flex flex-col`}>
                          {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <div className={`bg-[#${service.color}] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1`}>
                                <Star className="w-4 h-4" />
                                Populaire
                              </div>
                            </div>
                          )}
                          
                          <CardContent className="p-8 flex flex-col h-full">
                            <div className="text-center mb-6">
                              <h4 className="text-xl font-bold text-[#374151] mb-2">{pkg.name}</h4>
                              <div className="mb-2">
                                <span className={`text-3xl font-bold text-[#${service.color}]`}>{pkg.price}</span>
                              </div>
                              <p className="text-[#374151] text-sm">{pkg.description}</p>
                            </div>

                            <div className="flex-1">
                              <div className="mb-6">
                                <h5 className="font-semibold text-[#374151] mb-3">Inclus :</h5>
                                <ul className="space-y-2">
                                  {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <Check className={`w-4 h-4 text-[#${service.color}] flex-shrink-0 mt-0.5`} />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {pkg.notIncluded && (
                                <div className="mb-6">
                                  <h5 className="font-semibold text-[#374151] mb-3">Non inclus :</h5>
                                  <ul className="space-y-2">
                                    {pkg.notIncluded.map((feature, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                                        <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <Button 
                              onClick={() => addToCart(pkg, service.title, service.id)}
                              className={`w-full mt-auto ${pkg.popular ? `bg-[#${service.color}] hover:bg-[#${service.color}]/90` : `border-2 border-[#${service.color}] text-[#${service.color}] hover:bg-[#${service.color}] hover:text-white bg-transparent`}`}
                              size="lg"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Ajouter au projet
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Panier flottant */}
        {selectedPackages.length > 0 && (
          <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <Card className="w-80 shadow-xl border-[#45C7FF]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#374151]">Mon Projet ({selectedPackages.length})</h4>
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

                    {getTotalEstimate() > 0 && (
                      <div className="border-t pt-3 mb-4">
                        <div className="flex justify-between font-bold">
                          <span>Estimation :</span>
                          <span className="text-[#45C7FF]">{getTotalEstimate().toLocaleString()}€</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">*Estimation indicative, devis final sur mesure</p>
                      </div>
                    )}

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
