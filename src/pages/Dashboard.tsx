
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  TrendingUp, 
  Users, 
  Globe, 
  Star, 
  ArrowRight, 
  Calendar,
  Award,
  Zap,
  Target,
  Gift,
  Crown,
  Shield,
  Rocket,
  Diamond
} from 'lucide-react';

interface UserData {
  email: string;
  role: string;
  tier: string;
  services?: string[];
  name: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
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

  useEffect(() => {
    // Récupérer les données utilisateur
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      window.location.href = '/auth';
    }
  }, []);

  if (!userData) {
    return <div>Chargement...</div>;
  }

  const getUserServices = () => {
    switch(userData.tier) {
      case 'bronze':
        return ['site-web'];
      case 'silver':
        return ['site-web', 'community-management'];
      case 'gold':
        return ['site-web', 'growth-hacking', 'community-management'];
      case 'diamond':
        return ['site-web', 'growth-hacking', 'community-management', 'consulting'];
      default:
        return [];
    }
  };

  const getUserCredits = () => {
    switch(userData.tier) {
      case 'diamond':
        return { emails: 50000, sms: 10000, leads: 10000, automations: 'unlimited' };
      case 'gold':
        return { emails: 20000, sms: 5000, leads: 5000, automations: 50 };
      case 'silver':
        return { emails: 10000, sms: 2000, leads: 2000, automations: 20 };
      default:
        return { emails: 2000, sms: 500, leads: 500, automations: 5 };
    }
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
  const userServices = getUserServices();
  const userCredits = getUserCredits();

  const getServiceDisplayName = (service: string) => {
    switch(service) {
      case 'site-web': return 'Site Web';
      case 'growth-hacking': return 'Growth Hacking IA';
      case 'community-management': return 'Community Management';
      case 'consulting': return 'Consulting Digital';
      default: return service;
    }
  };

  const quickStats = [
    {
      title: 'Projets actifs',
      value: userServices.length,
      icon: Target,
      change: '+12%',
      positive: true
    },
    {
      title: 'Performances',
      value: userData.tier === 'diamond' ? '92%' : userData.tier === 'gold' ? '87%' : userData.tier === 'silver' ? '78%' : '65%',
      icon: TrendingUp,
      change: '+5%',
      positive: true
    },
    {
      title: 'Économies',
      value: userData.tier === 'diamond' ? '8,340€' : userData.tier === 'gold' ? '3,240€' : userData.tier === 'silver' ? '1,890€' : '450€',
      icon: Award,
      change: userData.tier === 'diamond' ? '+1,230€' : userData.tier === 'gold' ? '+680€' : userData.tier === 'silver' ? '+320€' : '+150€',
      positive: true
    },
    {
      title: 'Score qualité',
      value: userData.tier === 'diamond' ? '9.8/10' : userData.tier === 'gold' ? '9.2/10' : userData.tier === 'silver' ? '8.5/10' : '7.8/10',
      icon: Star,
      change: '+0.3',
      positive: true
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: userServices.includes('growth-hacking') ? 'Rapport mensuel généré' : 'Sauvegarde automatique',
      service: userServices.includes('growth-hacking') ? 'Growth Hacking IA' : 'Site Web',
      time: '2h',
      status: 'completed'
    },
    {
      id: 2,
      action: userServices.includes('community-management') ? 'Posts programmés publiés' : 'Maintenance site',
      service: userServices.includes('community-management') ? 'Community Management' : 'Site Web',
      time: '6h',
      status: 'completed'
    },
    {
      id: 3,
      action: userServices.includes('growth-hacking') ? 'Campagne email lancée' : 'Optimisation SEO',
      service: userServices.includes('growth-hacking') ? 'Growth Hacking IA' : 'Site Web',
      time: '1d',
      status: 'running'
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

        {/* Crédits restants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Emails</p>
                  <p className="text-2xl font-bold text-blue-600">{(userCredits.emails * 0.65).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">/ {userCredits.emails.toLocaleString()}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <Progress value={65} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">SMS</p>
                  <p className="text-2xl font-bold text-green-600">{(userCredits.sms * 0.42).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">/ {userCredits.sms.toLocaleString()}</p>
                </div>
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <Progress value={42} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Leads</p>
                  <p className="text-2xl font-bold text-purple-600">{(userCredits.leads * 0.78).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">/ {userCredits.leads.toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <Progress value={78} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Automations</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {typeof userCredits.automations === 'number' ? userCredits.automations * 0.6 : '∞'}
                  </p>
                  <p className="text-xs text-gray-500">
                    / {typeof userCredits.automations === 'number' ? userCredits.automations : 'Illimité'}
                  </p>
                </div>
                <Star className="w-8 h-8 text-orange-500" />
              </div>
              {typeof userCredits.automations === 'number' ? (
                <Progress value={60} className="h-2" />
              ) : (
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-blue-500" />
                    <Badge 
                      variant="outline" 
                      className={stat.positive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
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
                {userServices.length > 0 ? userServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {getServiceDisplayName(service)}
                        </h4>
                        <p className="text-sm text-gray-600">Service actif</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (service === 'site-web') window.location.href = '/dashboard/analytics';
                        else if (service === 'growth-hacking') window.location.href = '/dashboard/campaigns';
                        else if (service === 'community-management') window.location.href = '/dashboard/analytics';
                        else window.location.href = '/dashboard/account';
                      }}
                    >
                      Gérer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun service actif
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Découvrez nos solutions pour développer votre business
                    </p>
                    <Button onClick={() => window.location.href = '/pricing'}>
                      Voir nos services
                      <ArrowRight className="w-4 h-4 ml-2" />
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
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.service}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

            {/* Upgrade suggestion */}
            {tierInfo.nextTier && (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    Passez au niveau {tierInfo.nextTier}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Débloquez de nouvelles fonctionnalités et économisez plus
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
                    onClick={() => window.location.href = '/pricing'}
                  >
                    Découvrir
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Support rapide */}
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">
                  Besoin d'aide ?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Notre équipe est là pour vous accompagner
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/dashboard/help'}
                >
                  Contacter le support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
