
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Diamond, Rocket, Shield, Check, Star } from 'lucide-react';

const UpgradePlan = () => {
  const plans = [
    {
      tier: 'silver',
      name: 'Silver',
      icon: Rocket,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      price: '299€',
      period: '/mois',
      features: [
        'Analytics avancées',
        'Campagnes email de base',
        'Support prioritaire',
        '5 projets inclus'
      ]
    },
    {
      tier: 'gold',
      name: 'Gold',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      price: '599€',
      period: '/mois',
      popular: true,
      features: [
        'Toutes les fonctionnalités Silver',
        'Campagnes SMS & automation',
        'Analytics prédictives IA',
        'Community management',
        '15 projets inclus'
      ]
    },
    {
      tier: 'diamond',
      name: 'Diamond',
      icon: Diamond,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      price: '1299€',
      period: '/mois',
      features: [
        'Toutes les fonctionnalités Gold',
        'Solutions sur mesure',
        'Consultant dédié',
        'Intégrations avancées',
        'Projets illimités'
      ]
    }
  ];

  const handleUpgrade = (planTier: string) => {
    console.log(`Upgrade vers ${planTier}`);
    // Logique d'upgrade
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upgrader mon plan</h1>
          <p className="text-gray-600">Débloquez plus de fonctionnalités pour votre business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <Card key={plan.tier} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : 'border'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    <Star className="w-3 h-3 mr-1" />
                    Plus populaire
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <PlanIcon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                    onClick={() => handleUpgrade(plan.tier)}
                  >
                    Choisir ce plan
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpgradePlan;
