
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Eye, MousePointer, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsOverview } from '@/hooks/useAnalyticsData';
import CustomPieChart from '@/components/charts/PieChart';
import CustomLineChart from '@/components/charts/LineChart';
import { Skeleton } from '@/components/ui/skeleton';

const AdminAnalyticsOverviewPage = () => {
  const { data: analyticsData, isLoading } = useAnalyticsOverview();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const getMetricValue = (metricName: string) => {
    const metric = analyticsData?.find(d => d.metric_name === metricName);
    return metric?.metric_value || 0;
  };

  const overviewStats = [
    { 
      title: 'Visiteurs uniques', 
      value: getMetricValue('unique_visitors').toLocaleString(), 
      change: '+12.5%', 
      icon: Users, 
      color: 'text-blue-500' 
    },
    { 
      title: 'Pages vues', 
      value: getMetricValue('page_views').toLocaleString(), 
      change: '+8.2%', 
      icon: Eye, 
      color: 'text-green-500' 
    },
    { 
      title: 'Taux de clic', 
      value: `${getMetricValue('click_rate')}%`, 
      change: '+0.8%', 
      icon: MousePointer, 
      color: 'text-purple-500' 
    },
    { 
      title: 'Temps moyen', 
      value: `${Math.floor(getMetricValue('session_duration') / 60)}m ${getMetricValue('session_duration') % 60}s`, 
      change: '+15.3%', 
      icon: Clock, 
      color: 'text-orange-500' 
    },
  ];

  const topPages = [
    { name: '/solutions/agence-web', value: 45672, bounce: '32%' },
    { name: '/pricing', value: 38945, bounce: '28%' },
    { name: '/blog/growth-hacking', value: 29384, bounce: '35%' },
    { name: '/solutions/consulting', value: 24567, bounce: '30%' },
  ];

  const trafficTrend = [
    { name: 'Lun', value: 12400 },
    { name: 'Mar', value: 13200 },
    { name: 'Mer', value: 14800 },
    { name: 'Jeu', value: 13900 },
    { name: 'Ven', value: 15600 },
    { name: 'Sam', value: 11200 },
    { name: 'Dim', value: 10800 },
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
              <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
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
          {/* Graphique en secteurs des pages les plus visitées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Pages les plus visitées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomPieChart data={topPages} height={250} />
            </CardContent>
          </Card>

          {/* Tendance du trafic */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Tendance du trafic (7 jours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomLineChart data={trafficTrend} height={250} color="#10b981" />
            </CardContent>
          </Card>
        </div>

        {/* Tendances détaillées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Tendances cette semaine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="font-medium text-green-800">Forte croissance</h4>
              </div>
              <p className="text-sm text-green-700">Les solutions d'agence web attirent +25% de visiteurs</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="font-medium text-blue-800">Engagement élevé</h4>
              </div>
              <p className="text-sm text-blue-700">Temps de session augmenté de 15%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h4 className="font-medium text-orange-800">À surveiller</h4>
              </div>
              <p className="text-sm text-orange-700">Légère baisse sur mobile (-3%)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsOverviewPage;
