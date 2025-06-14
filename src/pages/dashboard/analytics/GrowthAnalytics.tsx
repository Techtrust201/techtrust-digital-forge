
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  Rocket,
  Brain,
  BarChart3,
  PieChart,
  Filter,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const GrowthAnalytics = () => {
  // Données simulées pour le growth hacking
  const growthData = [
    { name: 'Sem 1', acquisitions: 120, conversions: 24, retention: 85, revenue: 2400 },
    { name: 'Sem 2', acquisitions: 190, conversions: 38, retention: 87, revenue: 3800 },
    { name: 'Sem 3', acquisitions: 280, conversions: 56, retention: 89, revenue: 5600 },
    { name: 'Sem 4', acquisitions: 390, conversions: 78, retention: 91, revenue: 7800 }
  ];

  const experimentData = [
    { name: 'A/B Test Email', status: 'Actif', improvement: '+25%', confidence: 95 },
    { name: 'Landing Page V2', status: 'Terminé', improvement: '+18%', confidence: 98 },
    { name: 'Pricing Test', status: 'En cours', improvement: '+12%', confidence: 87 },
    { name: 'Onboarding Flow', status: 'Prévu', improvement: 'TBD', confidence: 0 }
  ];

  const channelsData = [
    { name: 'SEO', value: 35, color: '#10B981', cost: 'Faible' },
    { name: 'Paid Ads', value: 28, color: '#3B82F6', cost: 'Élevé' },
    { name: 'Réseaux Sociaux', value: 22, color: '#EC4899', cost: 'Moyen' },
    { name: 'Email', value: 15, color: '#F59E0B', cost: 'Faible' }
  ];

  const funnelData = [
    { stage: 'Visiteurs', count: 10000, conversion: 100 },
    { stage: 'Leads', count: 2500, conversion: 25 },
    { stage: 'Prospects', count: 750, conversion: 30 },
    { stage: 'Clients', count: 150, conversion: 20 }
  ];

  const quickStats = [
    {
      title: 'Taux Acquisition',
      value: '12.5%',
      change: '+3.2%',
      positive: true,
      icon: Target
    },
    {
      title: 'CAC (Coût Acquisition)',
      value: '€85',
      change: '-12%',
      positive: true,
      icon: DollarSign
    },
    {
      title: 'LTV (Valeur Vie Client)',
      value: '€850',
      change: '+18%',
      positive: true,
      icon: TrendingUp
    },
    {
      title: 'Rétention 30j',
      value: '78%',
      change: '+5%',
      positive: true,
      icon: Users
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-500" />
              Analytics Growth Hacking
            </h1>
            <p className="text-gray-600">
              Métriques et expérimentations de croissance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Rocket className="w-3 h-3 mr-1" />
              4 tests actifs
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <Brain className="w-3 h-3 mr-1" />
              IA optimisée
            </Badge>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-purple-500" />
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
          {/* Graphiques principaux */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courbe de croissance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  Métriques de Croissance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="acquisitions" stroke="#8B5CF6" strokeWidth={2} name="Acquisitions" />
                    <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                    <Line type="monotone" dataKey="retention" stroke="#F59E0B" strokeWidth={2} name="Rétention %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Funnel de conversion */}
            <Card>
              <CardHeader>
                <CardTitle>Funnel de Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-sm text-gray-600">{stage.count.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <Progress value={stage.conversion} className="h-8" />
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                          {stage.conversion}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expérimentations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Expérimentations en Cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experimentData.map((experiment, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{experiment.name}</h4>
                        <Badge 
                          variant={experiment.status === 'Actif' ? 'default' : 
                                  experiment.status === 'Terminé' ? 'secondary' : 'outline'}
                          className={experiment.status === 'Actif' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {experiment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Amélioration: </span>
                          <span className="font-medium text-green-600">{experiment.improvement}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Confiance: </span>
                          <span className="font-medium">{experiment.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Canaux d'acquisition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-500" />
                  Canaux d'Acquisition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={channelsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {channelsData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {channelsData.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: channel.color }}
                        />
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{channel.value}%</div>
                        <div className="text-xs text-gray-500">{channel.cost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Rocket className="w-4 h-4 mr-2" />
                    Nouveau test A/B
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="w-4 h-4 mr-2" />
                    Analyser cohortes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Optimiser funnel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Suggestion IA */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Suggestion IA</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Testez un nouveau call-to-action sur votre landing page
                </p>
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                  Lancer le test
                </Button>
              </CardContent>
            </Card>

            {/* Score de performance */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">92/100</div>
                <h3 className="font-bold text-gray-900 mb-2">Score Growth</h3>
                <Progress value={92} className="mb-4" />
                <p className="text-sm text-gray-600">
                  Excellent! Continuez sur cette voie
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GrowthAnalytics;
