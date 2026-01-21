
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  Zap, 
  Crown, 
  Rocket,
  Star,
  TrendingUp,
  Clock,
  Users,
  Phone,
  ArrowRight
} from 'lucide-react';

const PricingOptimized = () => {
  const { t } = useTranslation();
  const [urgencyTimer, setUrgencyTimer] = useState(23 * 60 + 47); // 23:47 minutes

  // Countdown timer for urgency
  React.useEffect(() => {
    const interval = setInterval(() => {
      setUrgencyTimer((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const services = {
    website: {
      title: "🚀 Sites Web Pro",
      subtitle: "Sites qui CONVERTISSENT",
      icon: Rocket,
      color: "blue",
      packages: [
        {
          id: "starter",
          name: "STARTER",
          originalPrice: 1490,
          price: 890,
          discount: "-40%",
          popular: false,
          badge: "ÉCONOMIQUE",
          features: [
            "Site 5 pages RESPONSIVE",
            "Optimisation SEO INCLUSE", 
            "Hébergement 1 AN GRATUIT",
            "Formulaires de contact",
            "SSL & Sécurité",
            "Support email 6 mois"
          ],
          bonus: "🎁 BONUS: Formation WordPress OFFERTE (299€)",
          cta: "COMMANDER MAINTENANT",
          delivery: "Livré en 7 jours"
        },
        {
          id: "business", 
          name: "BUSINESS",
          originalPrice: 2490,
          price: 1590,
          discount: "-36%",
          popular: true,
          badge: "⭐ PLUS POPULAIRE",
          features: [
            "Site jusqu'à 15 pages",
            "Design SUR MESURE premium",
            "SEO AVANCÉ (1ère page Google)",
            "Blog intégré + Analytics",
            "Hébergement 2 ANS INCLUS",
            "Support PRIORITAIRE 1 an"
          ],
          bonus: "🎁 BONUS: Audit SEO gratuit + 3 mois de maintenance (899€)",
          cta: "PRENDRE LE PLUS POPULAIRE",
          delivery: "Livré en 10 jours"
        },
        {
          id: "ecommerce",
          name: "E-COMMERCE PRO", 
          originalPrice: 4990,
          price: 2990,
          discount: "-40%",
          popular: false,
          badge: "💎 PREMIUM",
          features: [
            "E-commerce COMPLET",
            "Pages ILLIMITÉES",
            "Paiements sécurisés",
            "Gestion stock automatisée",
            "Multi-devises & langues",
            "Formation complète équipe",
            "Support VIP 24/7 - 2 ans"
          ],
          bonus: "🎁 BONUS: Marketing automation + Analytics pro (1499€)",
          cta: "LANCER MON E-COMMERCE",
          delivery: "Livré en 14 jours"
        }
      ]
    },
    growth: {
      title: "🤖 Growth Hacking IA", 
      subtitle: "IA qui REMPLACE vos commerciaux",
      icon: TrendingUp,
      color: "green",
      packages: [
        {
          id: "easy",
          name: "EASY IA",
          price: 297,
          monthly: true,
          popular: false,
          badge: "DÉBUTANT",
          features: [
            "1000 prospects IA/mois",
            "500 emails automatisés",  
            "2 réseaux sociaux IA",
            "Community management basique",
            "Reporting hebdomadaire"
          ],
          results: "📈 +150% de leads en moyenne",
          cta: "DÉMARRER L'IA MAINTENANT",
          guarantee: "Satisfait ou remboursé 30 jours"
        },
        {
          id: "pro",
          name: "PRO IA",
          originalPrice: 897,
          price: 597,
          monthly: true,
          discount: "-33%",
          popular: true,
          badge: "⚡ BEST-SELLER",
          features: [
            "5000 prospects IA/mois",
            "2000 emails automatisés",
            "5 réseaux sociaux IA", 
            "Lead scoring intelligent",
            "A/B testing automatique",
            "CRM intégrations",
            "Support chat prioritaire"
          ],
          results: "📈 +300% de leads clients réels",
          cta: "EXPLOSER MES VENTES",
          guarantee: "ROI garanti sous 60 jours"
        },
        {
          id: "enterprise", 
          name: "ENTERPRISE IA",
          originalPrice: 1997,
          price: 1297,
          monthly: true,
          discount: "-35%",
          popular: false,
          badge: "🏆 ULTIMATE",
          features: [
            "Prospects ILLIMITÉS",
            "IA propriétaire complète",
            "TOUS réseaux sociaux",
            "White label complet",
            "API access total",
            "Account manager dédié",
            "Support VIP 24/7"
          ],
          results: "📈 +500% de croissance garantie",
          cta: "DOMINER MON MARCHÉ", 
          guarantee: "Croissance garantie ou remboursé"
        }
      ]
    },
    community: {
      title: "👥 Community Management",
      subtitle: "Équipe d'experts DÉDIÉE",
      icon: Users,
      color: "purple", 
      packages: [
        {
          id: "starter",
          name: "STARTER TEAM",
          originalPrice: 1290,
          price: 799,
          monthly: true,
          discount: "-38%",
          popular: false,
          badge: "ÉQUIPE PRO",
          features: [
            "2 réseaux sociaux gérés",
            "10 posts créatifs/mois",
            "Community manager junior",
            "Stratégie personnalisée",
            "Reporting mensuel détaillé"
          ],
          results: "📱 +200% d'engagement moyen",
          cta: "DÉLÉGUER MA COMMU",
          guarantee: "Engagement garanti"
        },
        {
          id: "growth",
          name: "GROWTH TEAM", 
          originalPrice: 2490,
          price: 1499,
          monthly: true,
          discount: "-40%",
          popular: true,
          badge: "🔥 RECOMMANDÉ",
          features: [
            "4 réseaux sociaux premium",
            "25 posts + stories quotidiennes",
            "Community manager SENIOR",
            "Contenu vidéo inclus",
            "Influence marketing",
            "Analytics temps réel"
          ],
          results: "📱 +400% de followers clients réels",
          cta: "EXPLOSER MA VISIBILITÉ",
          guarantee: "Croissance followers garantie"
        },
        {
          id: "premium",
          name: "PREMIUM TEAM",
          originalPrice: 4990,
          price: 2999,
          monthly: true, 
          discount: "-40%",
          popular: false,
          badge: "👑 VIP",
          features: [
            "TOUS réseaux sociaux",
            "Contenu illimité + vidéos pro",
            "Équipe complète dédiée",
            "Événements communauté",
            "Gestion influenceurs",
            "Account manager personnel"
          ],
          results: "📱 Communauté de +10K en 3 mois",
          cta: "DEVENIR VIRAL",
          guarantee: "Viralité garantie ou remboursé"
        }
      ]
    }
  };

  const testimonials = [
    {
      name: "Marie L.",
      company: "E-commerce mode",
      result: "+320% de CA en 4 mois",
      text: "Techtrust a transformé mon business ! L'IA génère 50 leads/jour automatiquement."
    },
    {
      name: "Jean-Paul M.", 
      company: "Cabinet expertise",
      result: "1er sur Google en 2 mois",
      text: "Site + SEO = je suis passé de 0 à 200 clients/mois. Incroyable ROI !"
    }
  ];

  const handleOrderNow = (packageName: string, price: number, isMonthly: boolean = false) => {
    // Scroll to contact or open modal
    const contactSection = document.getElementById('contact-urgency');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(`Commande: ${packageName} - ${price}€${isMonthly ? '/mois' : ''}`);
  };

  return (
    <>
      <SEO
        title="🔥 PROMO -40% | Techtrust - Sites Web + IA Growth Hacking | Offre Limitée 2025"
        description="🚨 DERNIERS JOURS -40% ! Site web pro dès 890€, IA Growth Hacking dès 297€/mois. ROI garanti ou remboursé. +500 clients satisfaits !"
        keywords="promo techtrust, site web promo, growth hacking promo, ia marketing, offre limitée"
        canonicalUrl="https://www.tech-trust.fr/pricing"
      />

      <div className="min-h-screen bg-gray-50">
        <NavbarPublic />
        
        <main className="pt-20">
          {/* URGENCY HEADER */}
          <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-4 text-center">
                <Clock className="w-5 h-5 animate-pulse" />
                <div className="font-bold">
                  🔥 PROMO -40% SE TERMINE DANS: <span className="text-yellow-300 text-xl">{formatTime(urgencyTimer)}</span>
                </div>
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </section>

          {/* HERO SECTION */}
          <section className="bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <Badge className="bg-red-500 text-white px-4 py-2 text-lg mb-6 animate-pulse">
                🚨 DERNIERS JOURS -40%
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-yellow-300">TRANSFORMEZ</span> votre Business
                <br />
                avec nos <span className="text-green-400">Solutions IA 2025</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                🤖 <strong>IA qui remplace vos commerciaux</strong> + Sites web qui convertissent
                <br />
                <span className="text-yellow-300">ROI garanti ou remboursé !</span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-green-500 text-white px-4 py-2">
                  ✅ +500 clients satisfaits
                </Badge>
                <Badge className="bg-yellow-500 text-black px-4 py-2">
                  ⚡ Livraison express
                </Badge>
                <Badge className="bg-purple-500 text-white px-4 py-2">
                  🎯 ROI moyen +300%
                </Badge>
              </div>

              {/* SOCIAL PROOF */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-yellow-300 font-bold text-lg mb-2">
                      "{testimonial.result}"
                    </div>
                    <p className="text-gray-200 mb-3">"{testimonial.text}"</p>
                    <div className="text-sm opacity-75">
                      - {testimonial.name}, {testimonial.company}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING TABS */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Choisissez votre <span className="text-red-600">ARME SECRÈTE</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Solutions qui ont généré +50M€ de CA pour nos clients
                </p>
                
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 max-w-2xl mx-auto mt-6">
                  <div className="flex items-center justify-center gap-2 text-red-700 font-bold">
                    <Zap className="w-5 h-5" />
                    ATTENTION: Prix remontent à la normale dans {formatTime(urgencyTimer)}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="website" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12 h-14">
                  {Object.entries(services).map(([key, service]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="flex items-center gap-2 text-sm font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      <service.icon className="w-4 h-4" />
                      {service.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(services).map(([key, service]) => (
                  <TabsContent key={key} value={key}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-600">{service.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {service.packages.map((pkg, index) => (
                        <Card 
                          key={pkg.id}
                          className={`relative transition-all duration-300 hover:scale-105 ${
                            pkg.popular 
                              ? 'ring-4 ring-red-500 shadow-2xl transform scale-105' 
                              : 'hover:shadow-xl'
                          }`}
                        >
                          {/* POPULAR BADGE */}
                          {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                              <Badge className="bg-red-500 text-white px-6 py-2 text-sm font-bold animate-pulse">
                                <Star className="w-4 h-4 mr-1" />
                                {pkg.badge}
                              </Badge>
                            </div>
                          )}

                          {/* DISCOUNT BADGE */}
                          {pkg.discount && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                              {pkg.discount}
                            </div>
                          )}

                          <CardContent className="p-8 text-center h-full flex flex-col">
                            {/* Package Name & Badge */}
                            <div className="mb-4">
                              {!pkg.popular && (
                                <Badge className="mb-3 bg-gray-100 text-gray-700">
                                  {pkg.badge}
                                </Badge>
                              )}
                              <h4 className="text-2xl font-bold text-gray-900">
                                {pkg.name}
                              </h4>
                            </div>

                            {/* Pricing */}
                            <div className="mb-6">
                              {pkg.originalPrice && (
                                <div className="text-gray-500 line-through text-lg mb-1">
                                  {pkg.originalPrice}€{pkg.monthly ? '/mois' : ''}
                                </div>
                              )}
                              <div className="text-4xl font-bold text-red-600 mb-2">
                                {pkg.price}€{pkg.monthly ? '/mois' : ''}
                              </div>
                              {pkg.delivery && (
                                <div className="text-sm text-green-600 font-medium">
                                  ⚡ {pkg.delivery}
                                </div>
                              )}
                            </div>

                            {/* Features */}
                            <div className="flex-1 mb-6">
                              <ul className="space-y-3 text-left">
                                {pkg.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Bonus */}
                              {'bonus' in pkg && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                                  <div className="text-sm font-medium text-yellow-800">
                                    {pkg.bonus}
                                  </div>
                                </div>
                              )}

                              {/* Results */}
                              {'results' in pkg && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                                  <div className="text-sm font-bold text-green-800">
                                    {pkg.results}
                                  </div>
                                </div>
                              )}

                              {/* Guarantee */}
                              {'guarantee' in pkg && (
                                <div className="text-xs text-blue-600 font-medium mt-3">
                                  🛡️ {pkg.guarantee}
                                </div>
                              )}
                            </div>

                            {/* CTA Button */}
                            <Button
                              onClick={() => handleOrderNow(pkg.name, pkg.price, pkg.monthly)}
                              size="lg"
                              className={`w-full h-14 text-lg font-bold transition-all ${
                                pkg.popular
                                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                                  : 'bg-gray-900 hover:bg-gray-800 text-white'
                              }`}
                            >
                              {pkg.cta}
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* CONTACT URGENCY */}
          <section id="contact-urgency" className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  🚨 DERNIÈRE CHANCE
                  <br />
                  <span className="text-yellow-300">-40% SE TERMINE BIENTÔT</span>
                </h2>
                
                <p className="text-xl mb-8">
                  Ne laissez pas vos concurrents prendre l'avantage !
                  <br />
                  <strong>Appelez MAINTENANT pour réserver votre solution</strong>
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Phone className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                    <h3 className="text-2xl font-bold mb-2">Appelez MAINTENANT</h3>
                    <p className="text-3xl font-bold text-yellow-300 mb-2">
                      +33 X XX XX XX XX
                    </p>
                    <p className="text-sm">Ligne directe - Réponse immédiate</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                    <h3 className="text-2xl font-bold mb-2">Devis Express</h3>
                    <p className="text-lg mb-4">Réponse en moins de 2h</p>
                    <Button 
                      size="lg"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                    >
                      OBTENIR MON DEVIS
                    </Button>
                  </div>
                </div>

                <div className="bg-yellow-400 text-black rounded-lg p-6 font-bold text-lg">
                  ⏰ Plus que {formatTime(urgencyTimer)} avant la fin de la promo !
                  <br />
                  Prix remontent à +40% après ça !
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PricingOptimized;
