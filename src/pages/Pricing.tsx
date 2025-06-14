import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PackageCard from '@/components/pricing/PackageCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Trash2,
  Globe,
  TrendingUp,
  Crown,
  Code,
  MessageSquare,
  Target,
  Mail,
  X
} from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: any}>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState('website');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const services = {
    website: {
      title: "Sites Web Pro",
      subtitle: "Sites professionnels & E-commerce",
      description: "Développement de sites web modernes 2025, optimisés SEO et adaptés à tous les appareils.",
      icon: Globe,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkColor: "text-blue-700",
      packages: [
        {
          id: "website-starter",
          name: "Starter",
          price: 899,
          duration: "Paiement unique",
          popular: false,
          features: [
            "Site vitrine 5 pages",
            "Design responsive",
            "Optimisation SEO de base",
            "Formulaire de contact",
            "Hébergement 1 an inclus",
            "SSL gratuit",
            "Support email"
          ],
          notIncluded: [
            "E-commerce",
            "Analytics avancées",
            "Maintenance premium"
          ]
        },
        {
          id: "website-business",
          name: "Business",
          price: 1599,
          duration: "Paiement unique",
          popular: true,
          features: [
            "Site web jusqu'à 15 pages",
            "Design sur mesure",
            "Optimisation SEO avancée",
            "Blog intégré",
            "Formulaires avancés",
            "Hébergement 2 ans inclus",
            "SSL & CDN inclus",
            "Analytics Google",
            "Support prioritaire"
          ],
          notIncluded: [
            "E-commerce complet",
            "Fonctionnalités avancées"
          ]
        },
        {
          id: "website-premium",
          name: "Premium E-commerce",
          price: 2999,
          duration: "Paiement unique",
          popular: false,
          features: [
            "Site e-commerce complet",
            "Nombre de pages illimité",
            "Design premium personnalisé",
            "SEO e-commerce avancé",
            "Système de paiement intégré",
            "Gestion stock automatisée",
            "Multi-devises & langues",
            "Analytics e-commerce",
            "Formation complète",
            "Support VIP 24/7"
          ],
          notIncluded: []
        }
      ]
    },
    growth: {
      title: "Growth Hacking IA",
      subtitle: "Automatisation complète avec IA",
      description: "Nos outils IA propriétaires automatisent votre prospection et community management.",
      icon: TrendingUp,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      lightBg: "bg-green-50",
      darkColor: "text-green-700",
      packages: [
        {
          id: "growth-easy",
          name: "Easy",
          price: 299,
          duration: "/mois",
          popular: false,
          features: [
            "1000 prospects/mois",
            "500 emails automatisés",
            "Community IA basique",
            "2 réseaux sociaux",
            "Analytics de base",
            "Support email"
          ],
          notIncluded: [
            "SMS marketing",
            "Lead scoring avancé",
            "Intégrations CRM"
          ]
        },
        {
          id: "growth-pro",
          name: "Pro",
          price: 599,
          duration: "/mois",
          popular: true,
          features: [
            "5000 prospects/mois",
            "2000 emails automatisés",
            "Community IA avancée",
            "5 réseaux sociaux",
            "Lead scoring IA",
            "Analytics avancées",
            "Intégrations CRM",
            "A/B testing",
            "Support chat"
          ],
          notIncluded: [
            "White label",
            "API access"
          ]
        },
        {
          id: "growth-enterprise",
          name: "Enterprise",
          price: 1299,
          duration: "/mois",
          popular: false,
          features: [
            "Prospects illimités",
            "Emails illimités",
            "IA propriétaire complète",
            "Tous réseaux sociaux",
            "Lead scoring premium",
            "Analytics temps réel",
            "Toutes intégrations",
            "White label complet",
            "API access complet",
            "Account manager dédié",
            "Support VIP 24/7"
          ],
          notIncluded: []
        }
      ]
    },
    custom: {
      title: "Solutions Sur Mesure",
      subtitle: "Développement personnalisé",
      description: "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus.",
      icon: Code,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      darkColor: "text-purple-700",
      packages: [
        {
          id: "custom-audit",
          name: "Audit & Conseil",
          price: 1500,
          duration: "Paiement unique",
          popular: false,
          features: [
            "Audit complet de vos besoins",
            "Recommandations personnalisées",
            "Roadmap de développement",
            "Estimation détaillée",
            "Support conseil 30 jours"
          ],
          notIncluded: [
            "Développement inclus",
            "Maintenance"
          ]
        },
        {
          id: "custom-app",
          name: "Application Sur Mesure",
          price: "À partir de 15 000",
          duration: "Selon projet",
          popular: true,
          features: [
            "Développement complet",
            "Design UX/UI personnalisé",
            "Base de données optimisée",
            "Intégrations API",
            "Tests & déploiement",
            "Formation équipe",
            "Maintenance 6 mois",
            "Support technique"
          ],
          notIncluded: []
        },
        {
          id: "custom-enterprise",
          name: "Solution Enterprise",
          price: "À partir de 50 000",
          duration: "Selon projet",
          popular: false,
          features: [
            "Architecture enterprise",
            "Sécurité avancée",
            "Haute disponibilité",
            "Intégrations complexes",
            "Formation avancée",
            "Support 24/7",
            "SLA garantis",
            "Account manager dédié"
          ],
          notIncluded: []
        }
      ]
    },
    community: {
      title: "Community Management",
      subtitle: "Équipe dédiée d'experts",
      description: "Notre équipe de community managers experts gère vos réseaux avec stratégie personnalisée.",
      icon: MessageSquare,
      color: "pink",
      bgGradient: "from-pink-500 to-pink-600",
      lightBg: "bg-pink-50",
      darkColor: "text-pink-700",
      packages: [
        {
          id: "community-starter",
          name: "Starter",
          price: 799,
          duration: "/mois",
          popular: false,
          features: [
            "2 réseaux sociaux",
            "10 posts/mois",
            "Community manager junior",
            "Stratégie de base",
            "Reporting mensuel",
            "Support email"
          ],
          notIncluded: [
            "Vidéos premium",
            "Publicités payantes",
            "Stories quotidiennes"
          ]
        },
        {
          id: "community-growth",
          name: "Growth",
          price: 1499,
          duration: "/mois",
          popular: true,
          features: [
            "4 réseaux sociaux",
            "25 posts/mois",
            "Community manager senior",
            "Stratégie avancée",
            "Création contenu premium",
            "Stories quotidiennes",
            "Reporting détaillé",
            "Support prioritaire"
          ],
          notIncluded: [
            "Influenceurs",
            "Événements"
          ]
        },
        {
          id: "community-premium",
          name: "Premium",
          price: 2999,
          duration: "/mois",
          popular: false,
          features: [
            "Tous réseaux sociaux",
            "Posts illimités",
            "Équipe dédiée complète",
            "Stratégie sur mesure",
            "Contenu premium + vidéos",
            "Gestion influenceurs",
            "Événements communauté",
            "Analytics avancées",
            "Account manager",
            "Support VIP 24/7"
          ],
          notIncluded: []
        }
      ]
    },
    consulting: {
      title: "Consulting Digital",
      subtitle: "Expertise & accompagnement",
      description: "Audit, stratégie et accompagnement personnalisé pour votre transformation digitale.",
      icon: Target,
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
      lightBg: "bg-orange-50",
      darkColor: "text-orange-700",
      packages: [
        {
          id: "consulting-audit",
          name: "Audit Digital",
          price: 2500,
          duration: "Paiement unique",
          popular: false,
          features: [
            "Audit complet digital",
            "Analyse concurrentielle",
            "Recommandations stratégiques",
            "Plan d'action détaillé",
            "Présentation exécutive",
            "Support 15 jours"
          ],
          notIncluded: [
            "Mise en œuvre",
            "Formation équipe"
          ]
        },
        {
          id: "consulting-strategy",
          name: "Stratégie & Accompagnement",
          price: 4500,
          duration: "/mois",
          popular: true,
          features: [
            "Stratégie digitale complète",
            "Accompagnement mensuel",
            "Sessions de coaching",
            "Suivi des KPIs",
            "Optimisations continues",
            "Reporting détaillé",
            "Formation équipe",
            "Support prioritaire"
          ],
          notIncluded: [
            "Développement technique"
          ]
        },
        {
          id: "consulting-premium",
          name: "Transformation Complète",
          price: "À partir de 15 000",
          duration: "Selon projet",
          popular: false,
          features: [
            "Transformation digitale 360°",
            "Accompagnement sur mesure",
            "Formation avancée équipe",
            "Mise en place process",
            "Outils & technologies",
            "Suivi performance",
            "Support dédié 6 mois",
            "Consultant dédié"
          ],
          notIncluded: []
        }
      ]
    }
  };

  const handlePackageSelect = (serviceId: string, packageData: any) => {
    const newSelected = { ...selectedPackages };
    newSelected[serviceId] = packageData;
    setSelectedPackages(newSelected);

    const existingCartItem = cartItems.find(item => item.serviceId === serviceId);
    if (existingCartItem) {
      setCartItems(cartItems.map(item => 
        item.serviceId === serviceId 
          ? { ...packageData, serviceId, serviceTitle: services[serviceId].title }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...packageData, 
        serviceId, 
        serviceTitle: services[serviceId].title 
      }]);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter(item => item.serviceId !== serviceId));
    const newSelected = { ...selectedPackages };
    delete newSelected[serviceId];
    setSelectedPackages(newSelected);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? 0 : item.price;
      return total + price;
    }, 0);
  };

  const handleQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailBody = `
Nouvelle demande de devis Techtrust

Client: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Entreprise: ${formData.company}

Packages sélectionnés:
${cartItems.map(item => `- ${item.serviceTitle}: ${item.name} (${item.price}€${item.duration})`).join('\n')}

Total estimé: ${getTotalPrice()}€

Message:
${formData.message}
    `;

    const mailtoLink = `mailto:contact@techtrust.fr?subject=Demande de devis - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    alert('✅ Votre demande de devis a été envoyée ! Nous vous répondrons sous 24h.');
  };

  return (
    <>
      <SEO
        title="Tarifs & Packages Techtrust 2025 | Création Site Web, Growth Hacking IA, Community Management"
        description="🚀 Découvrez nos tarifs transparents 2025 : Site web dès 899€, Growth Hacking IA dès 299€/mois, Community Management Pro. Devis gratuit en 24h !"
        keywords="tarifs techtrust, prix site web, growth hacking prix, community management tarifs, devis gratuit, packages digitaux"
        canonicalUrl="https://www.tech-trust.fr/pricing"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <NavbarPublic />
        
        <main className="pt-20">
          {/* Header avec animation */}
          <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Nos <span className="text-cyan-300">Tarifs</span> 2025
                </h1>
                <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                  Des solutions transparentes et personnalisées pour tous vos besoins digitaux
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Badge className="bg-green-500/20 border border-green-400 text-green-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
                    ✅ Devis gratuit en 24h
                  </Badge>
                  <Badge className="bg-blue-500/20 border border-blue-400 text-blue-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
                    🚀 Paiement en plusieurs fois
                  </Badge>
                  <Badge className="bg-purple-500/20 border border-purple-400 text-purple-100 px-6 py-3 text-base font-semibold backdrop-blur-sm">
                    💎 Satisfaction garantie
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Services Tabs avec animations et couleurs */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Choisissez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solution</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Découvrez nos 5 expertises pour accélérer votre croissance digitale
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto mb-16 h-auto bg-white shadow-xl rounded-2xl p-2 border">
                  {Object.entries(services).map(([key, service]) => {
                    const isActive = activeTab === key;
                    return (
                      <TabsTrigger 
                        key={key} 
                        value={key}
                        className={`flex flex-col items-center gap-2 text-xs lg:text-sm font-bold p-4 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? `bg-gradient-to-br ${service.bgGradient} text-white shadow-lg transform scale-105` 
                            : `hover:${service.lightBg} ${service.darkColor} hover:scale-105`
                        }`}
                      >
                        <service.icon className={`w-6 h-6 ${isActive ? 'text-white' : `text-${service.color}-600`}`} />
                        <span className="hidden lg:inline font-bold">{service.title}</span>
                        <span className="lg:hidden font-bold">{service.title.split(' ')[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {Object.entries(services).map(([serviceId, service]) => (
                  <TabsContent 
                    key={serviceId} 
                    value={serviceId}
                    className="animate-fade-in"
                  >
                    <div className={`text-center mb-12 p-8 rounded-3xl ${service.lightBg} border-2 border-${service.color}-200`}>
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.bgGradient} shadow-lg`}>
                          <service.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className={`text-3xl lg:text-4xl font-bold ${service.darkColor}`}>
                            {service.title}
                          </h3>
                          <p className={`text-lg font-medium ${service.darkColor} opacity-80`}>
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                      {service.packages.map((pkg, index) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          service={service}
                          isSelected={selectedPackages[serviceId]?.id === pkg.id}
                          onSelect={() => handlePackageSelect(serviceId, pkg)}
                          index={index}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* Cart Summary amélioré */}
          {cartItems.length > 0 && (
            <section className="bg-white border-t-4 border-gradient-to-r from-blue-500 to-purple-500 sticky bottom-0 z-40 shadow-2xl animate-slide-in-right">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex-1 w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                      Votre sélection ({cartItems.length} package{cartItems.length > 1 ? 's' : ''})
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cartItems.map((item) => {
                        const service = services[item.serviceId];
                        return (
                          <div key={item.serviceId} className={`flex items-center justify-between ${service.lightBg} p-6 rounded-2xl border-2 border-${service.color}-200 shadow-md`}>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <service.icon className={`w-5 h-5 text-${service.color}-600`} />
                                <p className="font-bold text-gray-900">{item.serviceTitle}</p>
                              </div>
                              <p className="text-sm text-gray-700 font-medium">{item.name}</p>
                              <p className={`text-xl font-bold ${service.darkColor}`}>
                                {typeof item.price === 'string' ? item.price : `${item.price.toLocaleString()}€`}
                                <span className="text-sm font-normal text-gray-600 ml-2">{item.duration}</span>
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.serviceId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-right bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border-2 border-blue-200">
                    <p className="text-3xl font-bold text-gray-900 mb-6">
                      Total: {getTotalPrice().toLocaleString()}€
                    </p>
                    <Button
                      onClick={() => setShowQuoteForm(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-10 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Mail className="w-6 h-6 mr-3" />
                      Demander un devis gratuit
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Quote Form Modal */}
          {showQuoteForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                      <Mail className="w-8 h-8 text-blue-600" />
                      Demande de devis personnalisé
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setShowQuoteForm(false)}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  <form onSubmit={handleQuoteRequest} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-lg font-semibold text-gray-700">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-lg font-semibold text-gray-700">Message (besoins spécifiques, délais...)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="mt-2 rounded-xl border-2 focus:border-blue-500"
                        rows={4}
                        placeholder="Décrivez vos besoins spécifiques, vos délais, ou toute information utile..."
                      />
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-4 text-xl">Récapitulatif de votre sélection:</h4>
                      {cartItems.map((item) => {
                        const service = services[item.serviceId];
                        return (
                          <div key={item.serviceId} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                            <div className="flex items-center gap-3">
                              <service.icon className={`w-5 h-5 text-${service.color}-600`} />
                              <span className="font-medium">{item.serviceTitle} - {item.name}</span>
                            </div>
                            <span className="font-bold text-lg">
                              {typeof item.price === 'string' ? item.price : `${item.price.toLocaleString()}€`}
                              <span className="text-sm font-normal text-gray-500 ml-1">{item.duration}</span>
                            </span>
                          </div>
                        );
                      })}
                      <div className="border-t-2 border-blue-300 pt-4 mt-4">
                        <div className="flex justify-between items-center font-bold text-2xl">
                          <span>Total estimé:</span>
                          <span className="text-blue-600">{getTotalPrice().toLocaleString()}€</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Mail className="w-6 h-6 mr-3" />
                      Envoyer ma demande de devis
                    </Button>

                    <p className="text-sm text-gray-600 text-center bg-blue-50 p-4 rounded-xl">
                      * Nous vous répondrons sous 24h avec un devis détaillé et personnalisé 🚀
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
