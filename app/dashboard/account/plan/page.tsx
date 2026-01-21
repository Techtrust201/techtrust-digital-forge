"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Check,
  Zap,
  Shield,
  Rocket,
  Diamond,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useUserSubscriptions } from '@/hooks/useUserSubscriptions';

export default function PlanPage() {
  const { getActivePackages } = useUserSubscriptions();
  const activePackages = getActivePackages();

  const currentPlan = {
    name: 'Gold',
    price: '€99/mois',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    progress: 75,
    nextTier: 'Diamond'
  };

  const plans = [
    {
      name: 'Bronze',
      price: '€29/mois',
      icon: Shield,
      features: ['Analytics de base', '1 campagne/mois', 'Support email'],
      current: false
    },
    {
      name: 'Silver',
      price: '€49/mois',
      icon: Rocket,
      features: ['Analytics avancées', '5 campagnes/mois', 'Support prioritaire', 'API access'],
      current: false
    },
    {
      name: 'Gold',
      price: '€99/mois',
      icon: Crown,
      features: ['Toutes les analytics', 'Campagnes illimitées', 'Support dédié', 'API premium', 'IA avancée'],
      current: true
    },
    {
      name: 'Diamond',
      price: '€199/mois',
      icon: Diamond,
      features: ['Accès complet', 'Account manager', 'Formation incluse', 'SLA garanti', 'Personnalisation'],
      current: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            Mon Plan
          </h1>
          <p className="text-gray-600">Gérez votre abonnement et découvrez nos offres</p>
        </div>

        {/* Plan actuel */}
        <Card className={`${currentPlan.bgColor} border-yellow-200`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Plan {currentPlan.name}</h2>
                  <p className="text-gray-600">{currentPlan.price}</p>
                  <Badge className="bg-yellow-100 text-yellow-800 mt-2">
                    <Zap className="w-3 h-3 mr-1" />
                    Plan actuel
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Progression vers {currentPlan.nextTier}
                </div>
                <Progress value={currentPlan.progress} className="w-48" />
                <div className="text-xs text-gray-500">{currentPlan.progress}% complété</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services actifs */}
        <Card>
          <CardHeader>
            <CardTitle>Services Actifs</CardTitle>
            <CardDescription>Vos services en cours d&apos;utilisation</CardDescription>
          </CardHeader>
          <CardContent>
            {activePackages.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activePackages.map((pkg, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{pkg.package_name}</h4>
                    <p className="text-sm text-gray-600">{pkg.package_category}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      {pkg.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Aucun service actif</p>
                <Button asChild>
                  <Link href="/dashboard/services">Découvrir nos services</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tous les plans */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Comparer les plans</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon;
              return (
                <Card key={index} className={plan.current ? 'border-yellow-500 border-2' : ''}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <PlanIcon className={`w-10 h-10 mx-auto mb-2 ${plan.current ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{plan.price}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.current ? (
                      <Button variant="outline" className="w-full" disabled>
                        Plan actuel
                      </Button>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href="/dashboard/upgrade">
                          Choisir
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
