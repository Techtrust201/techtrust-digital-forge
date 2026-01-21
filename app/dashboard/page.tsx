"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bell, 
  TrendingUp, 
  Users, 
  Globe, 
  Star, 
  Calendar,
  Zap,
  Target,
  Gift,
  Crown,
  Shield,
  Rocket,
  Diamond,
  Lock,
  Plus
} from 'lucide-react';
import { useUserSubscriptions } from '@/hooks/useUserSubscriptions';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import Link from 'next/link';

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Skeleton className="w-[300px] h-[80px] rounded-md" />
  </div>
);

export default function DashboardPage() {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Nouveau rapport mensuel disponible',
      message: 'Vos performances du mois de janvier sont prêtes',
      time: '2h',
      type: 'info'
    },
    {
      id: 2, 
      title: 'Mise à jour outil IA',
      message: 'Nouvelles fonctionnalités de prospection ajoutées',
      time: '1d',
      type: 'success'
    }
  ]);

  const { user, profile, isLoading, isAdmin } = useSupabaseAuth();
  const {
    loading: subsLoading,
    hasAnalyticsAccess,
    hasCampaignsAccess,
    hasAdvancedAnalytics,
    getActivePackages
  } = useUserSubscriptions();

  const loadingOverall = isLoading || subsLoading || !user;

  if (loadingOverall) return (
    <DashboardLayout>
      <Loading />
    </DashboardLayout>
  );

  const userData = {
    email: user.email || '',
    name: profile?.name ?? user.email?.split('@')[0] ?? 'Utilisateur',
    role: isAdmin ? "admin" : "client",
    tier: profile?.tier ?? 'bronze',
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return {
          icon: Shield,
          name: 'Bronze',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          progress: 25,
          nextTier: 'Silver'
        };
      case 'silver':
        return {
          icon: Rocket,
          name: 'Silver', 
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          progress: 50,
          nextTier: 'Gold'
        };
      case 'gold':
        return {
          icon: Crown,
          name: 'Gold',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50', 
          progress: 75,
          nextTier: 'Diamond'
        };
      case 'diamond':
        return {
          icon: Diamond,
          name: 'Diamond',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          progress: 100,
          nextTier: null
        };
      default:
        return {
          icon: Shield,
          name: 'Bronze',
          color: 'text-amber-600', 
          bgColor: 'bg-amber-50',
          progress: 25,
          nextTier: 'Silver'
        };
    }
  };

  const tierInfo = getTierInfo(userData.tier);
  const TierIcon = tierInfo.icon;
  const activePackages = getActivePackages();

  const quickStats = [
    {
      title: 'Services actifs',
      value: activePackages.length || 0,
      icon: Target,
      change: activePackages.length > 0 ? '+12%' : '0%',
      positive: activePackages.length > 0
    },
    {
      title: 'Analytics',
      value: hasAnalyticsAccess() ? 'Actif' : 'Limité',
      icon: TrendingUp,
      change: hasAnalyticsAccess() ? '+5%' : 'Bloqué',
      positive: hasAnalyticsAccess()
    },
    {
      title: 'Campagnes',
      value: hasCampaignsAccess() ? 'Disponible' : 'Indisponible',
      icon: Zap,
      change: hasCampaignsAccess() ? 'Accès complet' : 'Upgrade requis',
      positive: hasCampaignsAccess()
    },
    {
      title: 'Score qualité',
      value: activePackages.length > 0 ? '9.2/10' : '-',
      icon: Star,
      change: activePackages.length > 0 ? '+0.3' : 'N/A',
      positive: activePackages.length > 0
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Connexion dashboard',
      service: 'Système',
      time: 'Maintenant',
      status: 'completed'
    },
    {
      id: 2,
      action: hasAnalyticsAccess() ? 'Analytics consultées' : 'Accès analytics bloqué',
      service: 'Analytics',
      time: '1h',
      status: hasAnalyticsAccess() ? 'completed' : 'blocked'
    },
    {
      id: 3,
      action: hasCampaignsAccess() ? 'Campagne créée' : 'Fonctionnalité verrouillée',
      service: 'Campagnes',
      time: '2h',
      status: hasCampaignsAccess() ? 'completed' : 'blocked'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header avec badge tier */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bonjour {userData.name} 👋
            </h1>
            <p className="text-gray-600">
              Bienvenue sur votre dashboard Techtrust
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className={`${tierInfo.bgColor} border-0`}>
              <CardContent className="p-4 flex items-center gap-3">
                <TierIcon className={`w-6 h-6 ${tierInfo.color}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Niveau {tierInfo.name}</span>
                    {tierInfo.progress === 100 && <Crown className="w-4 h-4 text-yellow-500" />}
                  </div>
                  {tierInfo.nextTier && (
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Prochain: {tierInfo.nextTier}</span>
                        <span className="text-gray-600">{tierInfo.progress}%</span>
                      </div>
                      <Progress value={tierInfo.progress} className="h-2 w-32" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Stats rapides avec limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className={`w-8 h-8 ${stat.positive ? 'text-blue-500' : 'text-gray-400'}`} />
                    <Badge 
                      variant="outline" 
                      className={stat.positive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-2xl font-bold ${stat.positive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                  {!stat.positive && (
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Lock className="w-3 h-3 mr-1" />
                      Upgrade requis
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services actifs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Vos Services Actifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activePackages.length > 0 ? (
                  activePackages.map((subscription, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {subscription.package_name}
                          </h4>
                          <p className="text-sm text-gray-600">{subscription.package_category}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {subscription.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun service actif
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Découvrez nos solutions pour développer votre business
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/services">
                        <Plus className="w-4 h-4 mr-2" />
                        Voir nos services
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activité récente */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 
                        activity.status === 'blocked' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.service}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                      {activity.status === 'blocked' && (
                        <Lock className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Limitations d'accès */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <Lock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">
                  Fonctionnalités Limitées
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {!hasAnalyticsAccess() && (
                    <p>• Analytics avancées verrouillées</p>
                  )}
                  {!hasCampaignsAccess() && (
                    <p>• Campagnes marketing indisponibles</p>
                  )}
                  {!hasAdvancedAnalytics() && (
                    <p>• Rapports détaillés restreints</p>
                  )}
                </div>
                <Button asChild className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500">
                  <Link href="/dashboard/upgrade">
                    Upgrader mon plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      {notif.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                    <span className="text-xs text-gray-500">Il y a {notif.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support rapide */}
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">
                  Besoin d&apos;aide ?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Notre équipe est là pour vous accompagner
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/support">
                    Contacter le support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
