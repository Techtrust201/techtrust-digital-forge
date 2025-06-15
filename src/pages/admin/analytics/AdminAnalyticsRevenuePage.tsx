
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard, Repeat, Target, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRevenueAnalytics } from '@/hooks/useAnalyticsData';
import CustomBarChart from '@/components/charts/BarChart';
import CustomPieChart from '@/components/charts/PieChart';
import { Skeleton } from '@/components/ui/skeleton';

const AdminAnalyticsRevenuePage = () => {
  const { data: revenueData, isLoading } = useRevenueAnalytics();

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

  const revenueStats = [
    { title: 'Revenus totaux', value: '€147,230', change: '+18.2%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Revenus récurrents', value: '€89,450', change: '+12.8%', icon: Repeat, color: 'text-blue-500' },
    { title: 'Valeur moyenne', value: '€2,847', change: '+5.3%', icon: Target, color: 'text-purple-500' },
    { title: 'Conversions', value: '347', change: '+22.1%', icon: CreditCard, color: 'text-orange-500' },
  ];

  const monthlyTrends = [
    { name: 'Janvier', value: 125400, growth: '+15.2%' },
    { name: 'Février', value: 132800, growth: '+5.9%' },
    { name: 'Mars', value: 147230, growth: '+10.9%' },
  ];

  const servicesPieData = revenueData?.map(service => ({
    name: service.service,
    value: service.revenue,
  })) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Revenus</h1>
          <p className="text-gray-500 mt-2">Analyse détaillée des revenus et performances financières</p>
        </div>

        {/* Stats revenus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueStats.map((stat) => {
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
          {/* Graphique en secteurs des revenus par service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Répartition des revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomPieChart data={servicesPieData} height={300} />
            </CardContent>
          </Card>

          {/* Graphique en barres de l'évolution mensuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Évolution mensuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomBarChart data={monthlyTrends} height={300} color="#10b981" />
            </CardContent>
          </Card>
        </div>

        {/* Revenus par service - détails */}
        <Card>
          <CardHeader>
            <CardTitle>Revenus par service (détaillé)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData?.map((item) => (
                <div key={item.service} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{item.service}</h4>
                    <Badge variant="outline">{item.clients} clients</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">€{item.revenue.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsRevenuePage;
