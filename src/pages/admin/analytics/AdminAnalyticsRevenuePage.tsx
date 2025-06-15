
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard, Repeat, Target, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsRevenuePage = () => {
  const revenueStats = [
    { title: 'Revenus totaux', value: '€147,230', change: '+18.2%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Revenus récurrents', value: '€89,450', change: '+12.8%', icon: Repeat, color: 'text-blue-500' },
    { title: 'Valeur moyenne', value: '€2,847', change: '+5.3%', icon: Target, color: 'text-purple-500' },
    { title: 'Conversions', value: '347', change: '+22.1%', icon: CreditCard, color: 'text-orange-500' },
  ];

  const revenueByService = [
    { service: 'Agence Web', revenue: 58400, percentage: 39.7, clients: 45 },
    { service: 'Growth Hacking', revenue: 34200, percentage: 23.2, clients: 28 },
    { service: 'Consulting Digital', revenue: 28700, percentage: 19.5, clients: 22 },
    { service: 'Community Management', revenue: 25930, percentage: 17.6, clients: 31 },
  ];

  const monthlyTrends = [
    { month: 'Janvier', revenue: 125400, growth: '+15.2%' },
    { month: 'Février', revenue: 132800, growth: '+5.9%' },
    { month: 'Mars', revenue: 147230, growth: '+10.9%' },
  ];

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
          {/* Revenus par service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Revenus par service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByService.map((item) => (
                  <div key={item.service} className="p-4 bg-gray-50 rounded-lg">
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
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tendances mensuelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Évolution mensuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyTrends.map((month) => (
                <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{month.month}</h4>
                    <p className="text-sm text-gray-500">Croissance: {month.growth}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">€{month.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Projection Q2</h4>
                </div>
                <p className="text-green-700 font-bold text-xl">€165,000</p>
                <p className="text-sm text-green-600">Basé sur les tendances actuelles</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsRevenuePage;
