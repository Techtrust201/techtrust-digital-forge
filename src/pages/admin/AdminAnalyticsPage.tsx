
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Download,
  RefreshCw,
  Calendar,
  Target,
  MousePointer,
  Share2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminAnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Données mockées
  const visitorsData = [
    { date: '2025-01-10', visitors: 320, pageviews: 1240, sessions: 285 },
    { date: '2025-01-11', visitors: 450, pageviews: 1800, sessions: 420 },
    { date: '2025-01-12', visitors: 380, pageviews: 1520, sessions: 350 },
    { date: '2025-01-13', visitors: 520, pageviews: 2100, sessions: 480 },
    { date: '2025-01-14', visitors: 680, pageviews: 2720, sessions: 620 },
    { date: '2025-01-15', visitors: 750, pageviews: 3000, sessions: 690 },
    { date: '2025-01-16', visitors: 620, pageviews: 2480, sessions: 570 }
  ];

  const trafficSources = [
    { name: 'Recherche organique', value: 45, color: '#3B82F6' },
    { name: 'Réseaux sociaux', value: 25, color: '#10B981' },
    { name: 'Trafic direct', value: 20, color: '#F59E0B' },
    { name: 'Publicités', value: 10, color: '#EF4444' }
  ];

  const deviceStats = [
    { device: 'Desktop', users: 1250, percent: 52 },
    { device: 'Mobile', users: 980, percent: 41 },
    { device: 'Tablette', users: 170, percent: 7 }
  ];

  const topPages = [
    { page: '/solutions/growth-hacking', views: 2840, percent: 22 },
    { page: '/pricing', views: 2150, percent: 17 },
    { page: '/', views: 1980, percent: 15 },
    { page: '/blog/ia-marketing-2025', views: 1560, percent: 12 },
    { page: '/contact', views: 1120, percent: 9 }
  ];

  const conversionData = [
    { step: 'Visiteurs', value: 12500, conversion: 100 },
    { step: 'Leads', value: 1875, conversion: 15 },
    { step: 'Prospects qualifiés', value: 750, conversion: 6 },
    { step: 'Clients', value: 125, conversion: 1 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-2">Analysez les performances de votre site web</p>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="24h">Dernières 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">90 derniers jours</option>
            </select>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-green-600">+15.2% vs période précédente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pages vues</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48,760</div>
              <p className="text-xs text-green-600">+22.8% vs période précédente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3m 24s</div>
              <p className="text-xs text-red-600">-8.4% vs période précédente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
              <MousePointer className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34.2%</div>
              <p className="text-xs text-green-600">-5.1% vs période précédente</p>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution du trafic</CardTitle>
              <CardDescription>Visiteurs, pages vues et sessions sur 7 jours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="pageviews" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="sessions" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sources de trafic</CardTitle>
              <CardDescription>Répartition des visiteurs par canal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${percent}%`}
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Analyses détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Appareils utilisés
              </CardTitle>
              <CardDescription>Répartition par type d'appareil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deviceStats.map((device) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{device.device}</span>
                    <span className="text-gray-500">{device.users} utilisateurs ({device.percent}%)</span>
                  </div>
                  <Progress value={device.percent} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Pages les plus visitées
              </CardTitle>
              <CardDescription>Top 5 des pages populaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="text-sm font-medium truncate">{page.page}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{page.views}</div>
                    <div className="text-xs text-gray-500">{page.percent}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tunnel de conversion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Tunnel de conversion
            </CardTitle>
            <CardDescription>Analyse du parcours utilisateur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {conversionData.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                      {step.conversion}%
                    </div>
                    {index < conversionData.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -z-10" />
                    )}
                  </div>
                  <h4 className="font-semibold mt-3">{step.step}</h4>
                  <p className="text-2xl font-bold text-gray-900">{step.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métriques en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Temps réel
              </CardTitle>
              <CardDescription>Activité en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utilisateurs actifs</span>
                  <span className="text-2xl font-bold text-green-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pages vues/min</span>
                  <span className="text-lg font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouvelles sessions</span>
                  <span className="text-lg font-semibold">8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance
              </CardTitle>
              <CardDescription>Indicateurs clés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vitesse de chargement</span>
                    <span>2.1s</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Score SEO</span>
                    <span>92/100</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accessibilité</span>
                    <span>88/100</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Engagement social
              </CardTitle>
              <CardDescription>Interactions sociales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Partages aujourd'hui</span>
                  <span className="text-xl font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mentions</span>
                  <span className="text-lg font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouveaux followers</span>
                  <span className="text-lg font-semibold">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
