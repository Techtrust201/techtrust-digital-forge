import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Eye, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  BarChart3,
  PieChart,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const WebsiteAnalytics = () => {
  // Données simulées pour les graphiques
  const visitorsData = [
    { name: 'Lun', visiteurs: 1200, pages: 2400 },
    { name: 'Mar', visiteurs: 1900, pages: 1398 },
    { name: 'Mer', visiteurs: 2800, pages: 9800 },
    { name: 'Jeu', visiteurs: 3908, pages: 3908 },
    { name: 'Ven', visiteurs: 4800, pages: 4800 },
    { name: 'Sam', visiteurs: 3800, pages: 3800 },
    { name: 'Dim', visiteurs: 4300, pages: 4300 }
  ];

  const devicesData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' }
  ];

  const topPagesData = [
    { page: '/accueil', vues: 15420, taux: 85 },
    { page: '/services', vues: 8930, taux: 72 },
    { page: '/contact', vues: 6540, taux: 68 },
    { page: '/blog', vues: 4320, taux: 79 },
    { page: '/pricing', vues: 3210, taux: 65 }
  ];

  const quickStats = [
    {
      title: 'Visiteurs uniques',
      value: '24,569',
      change: '+12.5%',
      positive: true,
      icon: Users
    },
    {
      title: 'Pages vues',
      value: '89,432',
      change: '+8.3%',
      positive: true,
      icon: Eye
    },
    {
      title: 'Temps moyen',
      value: '3:42',
      change: '+15.2%',
      positive: true,
      icon: Clock
    },
    {
      title: 'Taux de rebond',
      value: '32.1%',
      change: '-5.4%',
      positive: true,
      icon: TrendingUp
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-500" />
              Analytics Site Web
            </h1>
            <p className="text-gray-600">
              Performance et statistiques de votre site web
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800 w-fit">
            <TrendingUp className="w-3 h-3 mr-1" />
            En croissance
          </Badge>
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
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
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
          {/* Graphique principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Évolution du Trafic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visiteurs" stroke="#3B82F6" strokeWidth={2} name="Visiteurs" />
                    <Line type="monotone" dataKey="pages" stroke="#10B981" strokeWidth={2} name="Pages vues" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top pages */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Pages les Plus Visitées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPagesData.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{page.page}</h4>
                        <p className="text-sm text-gray-600">{page.vues.toLocaleString()} vues</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{page.taux}%</div>
                          <div className="text-xs text-gray-500">engagement</div>
                        </div>
                        <Progress value={page.taux} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appareils */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-500" />
                  Répartition par Appareil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={devicesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {devicesData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {devicesData.map((device, index) => {
                    const DeviceIcon = device.name === 'Desktop' ? Monitor : device.name === 'Mobile' ? Smartphone : Tablet;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: device.color }}
                          />
                          <DeviceIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{device.name}</span>
                        </div>
                        <span className="text-sm font-medium">{device.value}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Rapport détaillé
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Optimiser SEO
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyser conversion
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance score */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">87/100</div>
                <h3 className="font-bold text-gray-900 mb-2">Score Performance</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Votre site performe bien !
                </p>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Voir détails
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WebsiteAnalytics;
