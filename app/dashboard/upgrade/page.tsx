"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Check,
  Star,
  Zap,
  Crown,
  ArrowRight
} from 'lucide-react';
import { useUserSubscriptions } from '@/hooks/useUserSubscriptions';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export default function UpgradePage() {
  const { getUserTier } = useUserSubscriptions();
  const { profile } = useSupabaseAuth();
  
  const currentTier = profile?.tier || getUserTier();

  const plans = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: 'Gratuit',
      description: 'Pour démarrer',
      icon: Star,
      color: 'amber',
      features: [
        'Accès dashboard basique',
        'Support par email',
        '1 utilisateur',
        'Analytics limitées'
      ],
      current: currentTier === 'bronze'
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '49€/mois',
      description: 'Pour les PME',
      icon: Zap,
      color: 'gray',
      features: [
        'Tout Bronze +',
        'Analytics avancées',
        'Support prioritaire',
        '5 utilisateurs',
        'Campagnes email'
      ],
      current: currentTier === 'silver',
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '149€/mois',
      description: 'Pour les entreprises',
      icon: Crown,
      color: 'yellow',
      features: [
        'Tout Silver +',
        'Analytics IA',
        'Support dédié',
        'Utilisateurs illimités',
        'Toutes les campagnes',
        'API access'
      ],
      current: currentTier === 'gold'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      amber: { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-600' },
      gray: { border: 'border-gray-200', bg: 'bg-gray-50', text: 'text-gray-600' },
      yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600' }
    };
    return colors[color] || colors.gray;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upgrader votre plan
          </h1>
          <p className="text-gray-600">
            Débloquez plus de fonctionnalités et accélérez votre croissance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const colors = getColorClasses(plan.color);
            
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''} ${plan.current ? colors.border : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                    Populaire
                  </Badge>
                )}
                {plan.current && (
                  <Badge className={`absolute -top-3 right-4 ${colors.bg} ${colors.text}`}>
                    Plan actuel
                  </Badge>
                )}
                
                <CardHeader className="text-center pt-8">
                  <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-gray-900 mt-4">
                    {plan.price}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? (
                      'Plan actuel'
                    ) : (
                      <>
                        Choisir ce plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Puis-je changer de plan à tout moment ?
              </h4>
              <p className="text-sm text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Y a-t-il un engagement ?
              </h4>
              <p className="text-sm text-gray-600">
                Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Comment fonctionne la facturation ?
              </h4>
              <p className="text-sm text-gray-600">
                La facturation est mensuelle. Vous êtes facturé au début de chaque période.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
