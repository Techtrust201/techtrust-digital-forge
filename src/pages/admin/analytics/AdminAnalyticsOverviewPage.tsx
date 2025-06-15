
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Activity, Eye, MousePointer, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsOverviewPage = () => {
  const overviewStats = [
    { title: 'Visiteurs uniques', value: '125,847', change: '+12.5%', icon: Users, color: 'text-blue-500' },
    { title: 'Pages vues', value: '892,436', change: '+8.2%', icon: Eye, color: 'text-green-500' },
    { title: 'Taux de clic', value: '3.24%', change: '+0.8%', icon: MousePointer, color: 'text-purple-500' },
    { title: 'Temps moyen', value: '4m 32s', change: '+15.3%', icon: Clock, color: 'text-orange-500' },
  ];

  const topPages = [
    { page: '/solutions/agence-web', views: 45672, bounce: '32%' },
    { page: '/pricing', views: 38945, bounce: '28%' },
    { page: '/blog/growth-hacking', views: 29384, bounce: '35%' },
    { page: '/solutions/consulting', views: 24567, bounce: '30%' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vue d'ensemble Analytics</h1>
          <p className="text-gray-500 mt-2">Performance globale de la plateforme</p>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    <Badge variant="outline" className="text-green-600 border-green-200">
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pages les plus visitées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Pages les plus visitées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{page.page}</p>
                        <p className="text-sm text-gray-500">Taux de rebond: {page.bounce}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">vues</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tendances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Tendances cette semaine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h4 className="font-medium text-green-800">Forte croissance</h4>
                </div>
                <p className="text-sm text-green-700">Les solutions d'agence web attirent +25% de visiteurs</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h4 className="font-medium text-blue-800">Engagement élevé</h4>
                </div>
                <p className="text-sm text-blue-700">Temps de session augmenté de 15%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h4 className="font-medium text-orange-800">À surveiller</h4>
                </div>
                <p className="text-sm text-orange-700">Légère baisse sur mobile (-3%)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsOverviewPage;
