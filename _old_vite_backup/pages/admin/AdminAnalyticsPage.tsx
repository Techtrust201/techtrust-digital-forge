
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  MousePointer,
  Clock,
  Target
} from 'lucide-react';

const AdminAnalyticsPage = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;

    if (path.includes('/revenue')) {
      return {
        title: "Analytics - Revenus",
        description: "Analyse détaillée des revenus et de la rentabilité",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">€45,230</p>
                    <p className="text-sm text-gray-500">Revenus ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">+23%</p>
                    <p className="text-sm text-gray-500">Croissance MoM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">€1,890</p>
                    <p className="text-sm text-gray-500">Revenu moyen/client</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">€540,000</p>
                    <p className="text-sm text-gray-500">Revenus annuels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }
    
    if (path.includes('/performance')) {
      return {
        title: "Analytics - Performance",
        description: "Métriques de performance et d'optimisation",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">2.3s</p>
                    <p className="text-sm text-gray-500">Temps de chargement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MousePointer className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-sm text-gray-500">Taux de clic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">4.2</p>
                    <p className="text-sm text-gray-500">Pages/session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">12.5%</p>
                    <p className="text-sm text-gray-500">Taux de rebond</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }
    
    if (path.includes('/users')) {
      return {
        title: "Analytics - Utilisateurs",
        description: "Analyse du comportement et de l'engagement des utilisateurs",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-gray-500">Utilisateurs actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">+15%</p>
                    <p className="text-sm text-gray-500">Nouveaux utilisateurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">5m 32s</p>
                    <p className="text-sm text-gray-500">Temps moyen/session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-sm text-gray-500">Taux de rétention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      };
    }

    // Page overview par défaut
    return {
      title: "Analytics - Vue d'ensemble",
      description: "Aperçu global des performances de la plateforme",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-gray-500">Utilisateurs totaux</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">€45,230</p>
                    <p className="text-sm text-gray-500">Revenus mensuels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">+23%</p>
                    <p className="text-sm text-gray-500">Croissance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">89%</p>
                    <p className="text-sm text-gray-500">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendances récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Augmentation des inscriptions</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+45%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Revenus en hausse</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+23%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Engagement utilisateur</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">+12%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    };
  };

  const pageContent = getPageContent();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageContent.title}</h1>
            <p className="text-gray-500 mt-2">{pageContent.description}</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Exporter les données
          </Button>
        </div>

        {pageContent.content}
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
