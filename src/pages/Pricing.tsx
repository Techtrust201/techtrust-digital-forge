
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Check, 
  X, 
  Star, 
  ShoppingCart, 
  Trash2,
  Globe,
  Rocket,
  Crown,
  Zap,
  Users,
  Settings,
  Mail,
  Phone,
  Building
} from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: any}>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const pricingData = {
    website: {
      title: "Création Site Web",
      subtitle: "Sites professionnels & E-commerce",
      description: "Développement de sites web modernes 2025, optimisés SEO et adaptés à tous les appareils.",
      color: "from-blue-500 to-cyan-500",
      packages: [
        {
          id: "website-starter",
          name: "Starter",
          price: 899,
          duration: "one-time",
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
          ],
          popular: false
        },
        {
          id: "website-business",
          name: "Business",
          price: 1599,
          duration: "one-time",
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
          ],
          popular: true
        },
        {
          id: "website-premium",
          name: "Premium E-commerce",
          price: 2999,
          duration: "one-time",
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
          notIncluded: [],
          popular: false
        }
      ]
    },
    growth: {
      title: "Growth Hacking IA",
      subtitle: "🤖 Automatisation complète + Community IA",
      description: "Nos outils IA propriétaires automatisent votre prospection et community management.",
      color: "from-green-500 to-emerald-500",
      packages: [
        {
          id: "growth-easy",
          name: "Easy",
          price: 299,
          duration: "/mois",
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
          ],
          popular: false
        },
        {
          id: "growth-pro",
          name: "Pro",
          price: 599,
          duration: "/mois",
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
          ],
          popular: true
        },
        {
          id: "growth-enterprise",
          name: "Enterprise",
          price: 1299,
          duration: "/mois",
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
          notIncluded: [],
          popular: false
        }
      ]
    },
    custom: {
      title: "Solutions Sur Mesure",
      subtitle: "Développement personnalisé",
      description: "Logiciels métier, CRM, ERP et applications sur mesure pour optimiser vos processus.",
      color: "from-purple-500 to-pink-500",
      packages: [
        {
          id: "custom-audit",
          name: "Audit & Conseil",
          price: 1500,
          duration: "one-time",
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
          ],
          popular: false
        },
        {
          id: "custom-app",
          name: "Application Sur Mesure",
          price: 15000,
          duration: "starting at",
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
          notIncluded: [],
          popular: true
        },
        {
          id: "custom-enterprise",
          name: "Solution Enterprise",
          price: 50000,
          duration: "starting at",
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
          notIncluded: [],
          popular: false
        }
      ]
    },
    community: {
      title: "Community Management",
      subtitle: "Équipe dédiée experte",
      description: "Notre équipe de community managers experts gère vos réseaux avec stratégie personnalisée.",
      color: "from-orange-500 to-red-500",
      packages: [
        {
          id: "community-starter",
          name: "Starter",
          price: 799,
          duration: "/mois",
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
          ],
          popular: false
        },
        {
          id: "community-growth",
          name: "Growth",
          price: 1499,
          duration: "/mois",
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
          ],
          popular: true
        },
        {
          id: "community-premium",
          name: "Premium",
          price: 2999,
          duration: "/mois",
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
          notIncluded: [],
          popular: false
        }
      ]
    }
  };

  const handlePackageSelect = (categoryId: string, packageData: any) => {
    const newSelected = { ...selectedPackages };
    
    // Un seul package par catégorie
    newSelected[categoryId] = packageData;
    setSelectedPackages(newSelected);

    // Ajouter au panier
    const existingCartItem = cartItems.find(item => item.categoryId === categoryId);
    if (existingCartItem) {
      setCartItems(cartItems.map(item => 
        item.categoryId === categoryId 
          ? { ...packageData, categoryId, categoryTitle: pricingData[categoryId].title }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...packageData, 
        categoryId, 
        categoryTitle: pricingData[categoryId].title 
      }]);
    }
  };

  const removeFromCart = (categoryId: string) => {
    setCartItems(cartItems.filter(item => item.categoryId !== categoryId));
    const newSelected = { ...selectedPackages };
    delete newSelected[categoryId];
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
${cartItems.map(item => `- ${item.categoryTitle}: ${item.name} (${item.price}€${item.duration})`).join('\n')}

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

      <div className="min-h-screen bg-gray-50">
        <NavbarPublic />
        
        <main className="pt-20">
          {/* Header */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Nos <span className="text-cyan-300">Tarifs</span> 2025
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Des solutions transparentes pour tous vos besoins digitaux
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge className="bg-green-500 text-white px-4 py-2">
                  ✅ Devis gratuit en 24h
                </Badge>
                <Badge className="bg-blue-500 text-white px-4 py-2">
                  🚀 Paiement en plusieurs fois
                </Badge>
                <Badge className="bg-purple-500 text-white px-4 py-2">
                  💎 Satisfaction garantie
                </Badge>
              </div>
            </div>
          </section>

          {/* Pricing Tables */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              {Object.entries(pricingData).map(([categoryId, category]) => (
                <div key={categoryId} className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {category.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-2">{category.subtitle}</p>
                    <p className="text-lg text-gray-500">{category.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.packages.map((pkg) => (
                      <Card 
                        key={pkg.id}
                        className={`relative h-full transition-all duration-300 hover:shadow-2xl ${
                          pkg.popular 
                            ? 'ring-2 ring-blue-500 transform scale-105' 
                            : 'hover:scale-105'
                        } ${
                          selectedPackages[categoryId]?.id === pkg.id 
                            ? 'ring-4 ring-green-500 bg-green-50' 
                            : ''
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-sm font-bold">
                              <Star className="w-4 h-4 mr-1" />
                              POPULAIRE
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <CardTitle className="text-2xl font-bold text-gray-900">
                            {pkg.name}
                          </CardTitle>
                          <div className="mt-4">
                            <span className="text-4xl font-bold text-gray-900">
                              {typeof pkg.price === 'string' ? pkg.price : `${pkg.price}€`}
                            </span>
                            <span className="text-gray-500 ml-2">{pkg.duration}</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-6">
                          <div className="space-y-3">
                            {pkg.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                            {pkg.notIncluded.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 opacity-60">
                                <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <span className="text-gray-500 line-through">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            onClick={() => handlePackageSelect(categoryId, pkg)}
                            className={`w-full h-12 text-lg font-bold transition-all ${
                              selectedPackages[categoryId]?.id === pkg.id
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : pkg.popular
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                                : 'bg-gray-900 hover:bg-gray-800 text-white'
                            }`}
                          >
                            {selectedPackages[categoryId]?.id === pkg.id ? (
                              <>
                                <Check className="w-5 h-5 mr-2" />
                                Sélectionné
                              </>
                            ) : (
                              'Choisir ce package'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <section className="bg-white border-t border-gray-200 sticky bottom-0 z-40 shadow-lg">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Votre sélection ({cartItems.length} package{cartItems.length > 1 ? 's' : ''})
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cartItems.map((item) => (
                        <div key={item.categoryId} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.categoryTitle}</p>
                            <p className="text-sm text-gray-600">{item.name}</p>
                            <p className="text-lg font-bold text-blue-600">
                              {typeof item.price === 'string' ? item.price : `${item.price}€${item.duration}`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.categoryId)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      Total: {getTotalPrice().toLocaleString()}€
                    </p>
                    <Button
                      onClick={() => setShowQuoteForm(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-bold"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Quote Form Modal */}
          {showQuoteForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Demande de devis personnalisé
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setShowQuoteForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  <form onSubmit={handleQuoteRequest} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (besoins spécifiques, délais...)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="mt-1"
                        rows={4}
                        placeholder="Décrivez vos besoins spécifiques, vos délais, ou toute information utile..."
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Récapitulatif de votre sélection:</h4>
                      {cartItems.map((item) => (
                        <div key={item.categoryId} className="flex justify-between items-center py-1">
                          <span>{item.categoryTitle} - {item.name}</span>
                          <span className="font-bold">
                            {typeof item.price === 'string' ? item.price : `${item.price}€${item.duration}`}
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total estimé:</span>
                          <span>{getTotalPrice().toLocaleString()}€</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-bold"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Envoyer ma demande de devis
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      * Nous vous répondrons sous 24h avec un devis détaillé et personnalisé
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
