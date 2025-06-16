
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useUserPackages } from '@/hooks/useUserPackages';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart3, 
  Mail, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Lock, 
  Crown,
  Zap,
  Globe,
  Heart
} from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isLoading: authLoading, user, profile } = useSupabaseAuth();
  const { 
    subscriptions, 
    loading: packagesLoading, 
    canAccessFeature, 
    getUpgradeMessage,
    getSocialNetworksLimit,
    getEmailLimit
  } = useUserPackages(user?.id);

  if (authLoading || packagesLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    {
      title: 'Analytics',
      value: canAccessFeature('analytics') ? '12.5K' : '--',
      description: 'Visiteurs ce mois',
      icon: BarChart3,
      color: 'bg-blue-500',
      locked: !canAccessFeature('analytics')
    },
    {
      title: 'Emails envoyés',
      value: canAccessFeature('email-campaigns') ? '2,847' : '--',
      description: `Limite: ${getEmailLimit() === -1 ? 'Illimité' : getEmailLimit().toLocaleString()}`,
      icon: Mail,
      color: 'bg-green-500',
      locked: !canAccessFeature('email-campaigns')
    },
    {
      title: 'Réseaux sociaux',
      value: getSocialNetworksLimit() > 0 ? getSocialNetworksLimit() : '--',
      description: getSocialNetworksLimit() === -1 ? 'Illimité' : `${getSocialNetworksLimit()} réseaux max`,
      icon: MessageSquare,
      color: 'bg-purple-500',
      locked: getSocialNetworksLimit() === 0
    },
    {
      title: 'Conversions',
      value: canAccessFeature('advanced-analytics') ? '3.2%' : '--',
      description: 'Taux de conversion',
      icon: TrendingUp,
      color: 'bg-orange-500',
      locked: !canAccessFeature('advanced-analytics')
    }
  ];

  const features = [
    {
      title: 'Analytics Avancées',
      description: 'Tableaux de bord détaillés et insights avancés',
      icon: BarChart3,
      available: canAccessFeature('advanced-analytics'),
      upgradeMessage: getUpgradeMessage('advanced-analytics')
    },
    {
      title: 'Campagnes Email',
      description: 'Création et gestion de campagnes email marketing',
      icon: Mail,
      available: canAccessFeature('email-campaigns'),
      upgradeMessage: getUpgradeMessage('email-campaigns')
    },
    {
      title: 'Campagnes SMS',
      description: 'Envoi de campagnes SMS personnalisées',
      icon: MessageSquare,
      available: canAccessFeature('sms-campaigns'),
      upgradeMessage: getUpgradeMessage('sms-campaigns')
    },
    {
      title: 'Automatisation',
      description: 'Workflows automatisés et lead nurturing',
      icon: Zap,
      available: canAccessFeature('automation'),
      upgradeMessage: getUpgradeMessage('automation')
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête de bienvenue */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Bienvenue {profile?.name || user?.email} !
              </h1>
              <p className="text-red-100 mt-1">
                Voici un aperçu de vos performances et outils disponibles
              </p>
            </div>
            <div className="flex items-center gap-3">
              {subscriptions.map((sub) => (
                <Badge key={sub.id} variant="outline" className="bg-white/20 text-white border-white/30">
                  {sub.package_name}
                </Badge>
              ))}
              {subscriptions.length === 0 && (
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  Aucun package actif
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`relative ${stat.locked ? 'opacity-60' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {stat.value}
                  {stat.locked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fonctionnalités disponibles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`${!feature.available ? 'border-dashed border-gray-300' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${feature.available ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <feature.icon className={`h-5 w-5 ${feature.available ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  {feature.title}
                  {!feature.available && <Lock className="h-4 w-4 text-gray-400" />}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {feature.available ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Accéder
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{feature.upgradeMessage}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/pricing">
                        <Crown className="h-4 w-4 mr-2" />
                        Mettre à niveau
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message d'encouragement si aucun package */}
        {subscriptions.length === 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-900">Boostez votre croissance !</CardTitle>
              <CardDescription className="text-blue-700">
                Choisissez un package pour débloquer tous les outils de growth hacking, 
                community management et analytics avancées.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/pricing">
                  <Globe className="h-4 w-4 mr-2" />
                  Découvrir nos packages
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
