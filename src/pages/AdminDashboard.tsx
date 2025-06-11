
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Shield,
  Rocket,
  Crown,
  Diamond,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>(null);
  
  // Données simulées pour l'admin
  const [adminStats] = useState({
    totalUsers: 1247,
    activeProjects: 89,
    monthlyRevenue: 45670,
    conversionRate: 12.4
  });

  const [recentUsers] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie@entreprise.com',
      tier: 'gold',
      status: 'active',
      joinDate: '2024-01-15',
      revenue: 299
    },
    {
      id: 2,
      name: 'Pierre Martin',
      email: 'pierre@startup.fr',
      tier: 'silver',
      status: 'trial',
      joinDate: '2024-01-14',
      revenue: 89
    },
    {
      id: 3,
      name: 'Sophie Lefebvre',
      email: 'sophie@shop.com',
      tier: 'bronze',
      status: 'pending',
      joinDate: '2024-01-13',
      revenue: 39
    }
  ]);

  const [systemAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Serveur de backup à 85% de capacité',
      time: '30 min'
    },
    {
      id: 2,
      type: 'success',
      message: 'Nouvelle version IA déployée avec succès',
      time: '2h'
    },
    {
      id: 3,
      type: 'info',
      message: '15 nouveaux utilisateurs aujourd\'hui',
      time: '4h'
    }
  ]);

  useEffect(() => {
    const user = localStorage.getItem('techtrust_user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      
      // Vérifier si l'utilisateur est admin
      if (parsedUser.role !== 'admin') {
        window.location.href = '/dashboard';
      }
    } else {
      window.location.href = '/auth';
    }
  }, []);

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600', bgColor: 'bg-amber-50' };
      case 'silver':
        return { icon: Rocket, name: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-50' };
      case 'gold':
        return { icon: Crown, name: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      case 'diamond':
        return { icon: Diamond, name: 'Diamond', color: 'text-purple-600', bgColor: 'bg-purple-50' };
      default:
        return { icon: Shield, name: 'Bronze', color: 'text-amber-600', bgColor: 'bg-amber-50' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Actif' };
      case 'trial':
        return { icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Essai' };
      case 'pending':
        return { icon: XCircle, color: 'text-orange-600', bg: 'bg-orange-50', label: 'En attente' };
      default:
        return { icon: CheckCircle, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Inconnu' };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return { icon: AlertTriangle, color: 'text-orange-500' };
      case 'success':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'info':
        return { icon: Activity, color: 'text-blue-500' };
      default:
        return { icon: Activity, color: 'text-gray-500' };
    }
  };

  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord Admin 🔧
            </h1>
            <p className="text-gray-600">
              Vue d'ensemble de la plateforme Techtrust
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau client
            </Button>
            <Badge className="bg-red-100 text-red-800">
              Admin
            </Badge>
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <Badge variant="outline" className="text-green-600 border-green-200">
                  +12%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Utilisateurs total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
                <Badge variant="outline" className="text-green-600 border-green-200">
                  +8%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{adminStats.activeProjects}</h3>
                <p className="text-sm text-gray-600">Projets actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-yellow-500" />
                <Badge variant="outline" className="text-green-600 border-green-200">
                  +15%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{adminStats.monthlyRevenue.toLocaleString()}€</h3>
                <p className="text-sm text-gray-600">Revenus mensuels</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <Badge variant="outline" className="text-green-600 border-green-200">
                  +2.1%
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{adminStats.conversionRate}%</h3>
                <p className="text-sm text-gray-600">Taux de conversion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Utilisateurs récents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Nouveaux Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => {
                    const tierInfo = getTierInfo(user.tier);
                    const statusInfo = getStatusInfo(user.status);
                    const TierIcon = tierInfo.icon;
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`${tierInfo.color} ${tierInfo.bgColor} border-0 text-xs`}>
                                <TierIcon className="w-3 h-3 mr-1" />
                                {tierInfo.name}
                              </Badge>
                              <Badge className={`${statusInfo.color} ${statusInfo.bg} border-0 text-xs`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{user.revenue}€/mois</p>
                          <p className="text-sm text-gray-500">{user.joinDate}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    Voir tous les utilisateurs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertes système */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Alertes Système
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => {
                  const alertInfo = getAlertIcon(alert.type);
                  const AlertIcon = alertInfo.icon;
                  
                  return (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <AlertIcon className={`w-5 h-5 mt-0.5 ${alertInfo.color}`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">Il y a {alert.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer un compte client
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Générer un rapport
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Voir les performances
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
