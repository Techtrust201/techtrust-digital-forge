
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, UserCheck, UserX, Globe, Smartphone, Monitor, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsUsersPage = () => {
  const userStats = [
    { title: 'Utilisateurs actifs', value: '8,247', change: '+12.3%', icon: Users, color: 'text-blue-500' },
    { title: 'Nouveaux utilisateurs', value: '1,834', change: '+8.7%', icon: UserPlus, color: 'text-green-500' },
    { title: 'Utilisateurs fidèles', value: '5,692', change: '+5.2%', icon: UserCheck, color: 'text-purple-500' },
    { title: 'Taux d\'abandon', value: '23.4%', change: '-2.1%', icon: UserX, color: 'text-red-500' },
  ];

  const deviceStats = [
    { device: 'Desktop', users: 4523, percentage: 54.8, icon: Monitor },
    { device: 'Mobile', users: 2847, percentage: 34.5, icon: Smartphone },
    { device: 'Tablet', users: 877, percentage: 10.7, icon: Globe },
  ];

  const topCountries = [
    { country: 'France', users: 3256, flag: '🇫🇷', percentage: 39.5 },
    { country: 'Belgique', users: 1847, flag: '🇧🇪', percentage: 22.4 },
    { country: 'Suisse', users: 1205, flag: '🇨🇭', percentage: 14.6 },
    { country: 'Canada', users: 892, flag: '🇨🇦', percentage: 10.8 },
    { country: 'Maroc', users: 634, flag: '🇲🇦', percentage: 7.7 },
  ];

  const userBehavior = [
    { metric: 'Pages par session', value: '4.2', trend: '+0.3' },
    { metric: 'Durée moyenne', value: '3m 45s', trend: '+12s' },
    { metric: 'Taux de rebond', value: '32.1%', trend: '-2.4%' },
    { metric: 'Conversions', value: '8.7%', trend: '+1.2%' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Utilisateurs</h1>
          <p className="text-gray-500 mt-2">Analyse comportementale et démographique des utilisateurs</p>
        </div>

        {/* Stats utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat) => {
            const IconComponent = stat.icon;
            const isPositive = !stat.change.startsWith('-');
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    <Badge variant="outline" className={`${isPositive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}`}>
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
          {/* Répartition par appareils */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-500" />
                Répartition par appareils
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceStats.map((device) => {
                  const IconComponent = device.icon;
                  return (
                    <div key={device.device} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                          <h4 className="font-medium text-gray-900">{device.device}</h4>
                        </div>
                        <span className="text-sm text-gray-500">{device.percentage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{device.users.toLocaleString()}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top pays */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Top pays
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCountries.map((country) => (
                <div key={country.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{country.country}</h4>
                      <p className="text-sm text-gray-500">{country.percentage}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{country.users.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">utilisateurs</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comportement utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Comportement utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userBehavior.map((behavior) => {
                const isPositive = !behavior.trend.startsWith('-');
                return (
                  <div key={behavior.metric} className="p-4 bg-gray-50 rounded-lg text-center">
                    <h4 className="font-medium text-gray-900 mb-2">{behavior.metric}</h4>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{behavior.value}</p>
                    <Badge variant="outline" className={`${isPositive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}`}>
                      {behavior.trend}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsUsersPage;
