
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmailCampaigns = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  // Données simulées
  const campaignData = [
    { name: 'Sem 1', envois: 2400, ouvertures: 960, clics: 144 },
    { name: 'Sem 2', envois: 2800, ouvertures: 1120, clics: 168 },
    { name: 'Sem 3', envois: 3200, ouvertures: 1280, clics: 192 },
    { name: 'Sem 4', envois: 3600, ouvertures: 1440, clics: 216 }
  ];

  const campaignsData = [
    {
      id: 1,
      name: 'Newsletter Mensuelle',
      status: 'Envoyée',
      sent: 2500,
      opened: 1250,
      clicked: 187,
      openRate: 50,
      clickRate: 7.5,
      date: '15 Jan 2024'
    },
    {
      id: 2,
      name: 'Promotion Black Friday',
      status: 'Planifiée',
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      date: '24 Nov 2024'
    },
    {
      id: 3,
      name: 'Webinar Growth Hacking',
      status: 'En cours',
      sent: 1800,
      opened: 720,
      clicked: 108,
      openRate: 40,
      clickRate: 6,
      date: '10 Jan 2024'
    },
    {
      id: 4,
      name: 'Nouveaux Services 2024',
      status: 'Brouillon',
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      date: '-'
    }
  ];

  const templatesData = [
    { id: 1, name: 'Newsletter Standard', category: 'Newsletter', usage: 45 },
    { id: 2, name: 'Promotion Produit', category: 'Marketing', usage: 32 },
    { id: 3, name: 'Invitation Webinar', category: 'Event', usage: 28 },
    { id: 4, name: 'Bienvenue Client', category: 'Onboarding', usage: 67 }
  ];

  const quickStats = [
    {
      title: 'Taux d\'ouverture',
      value: '42.3%',
      change: '+5.2%',
      positive: true,
      icon: Eye
    },
    {
      title: 'Taux de clic',
      value: '6.8%',
      change: '+1.1%',
      positive: true,
      icon: MousePointer
    },
    {
      title: 'Abonnés actifs',
      value: '12,847',
      change: '+234',
      positive: true,
      icon: Users
    },
    {
      title: 'Revenus générés',
      value: '€15,420',
      change: '+18.7%',
      positive: true,
      icon: TrendingUp
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Envoyée': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Planifiée': return 'bg-yellow-100 text-yellow-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Envoyée': return Send;
      case 'En cours': return Play;
      case 'Planifiée': return Calendar;
      case 'Brouillon': return Edit;
      default: return Edit;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-500" />
              Email Marketing
            </h1>
            <p className="text-gray-600">
              Créez et gérez vos campagnes email
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Voir rapports
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle campagne
            </Button>
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

        {/* Onglets */}
        <div className="border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Campagnes
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'campaigns' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Campagnes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignsData.map((campaign) => {
                      const StatusIcon = getStatusIcon(campaign.status);
                      return (
                        <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <StatusIcon className="w-5 h-5 text-gray-500" />
                              <div>
                                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                                <p className="text-sm text-gray-600">{campaign.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status}
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Envoyés</div>
                              <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Ouvertures</div>
                              <div className="font-medium">{campaign.opened.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Taux ouverture</div>
                              <div className="font-medium">{campaign.openRate}%</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Taux clic</div>
                              <div className="font-medium">{campaign.clickRate}%</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Copy className="w-4 h-4 mr-1" />
                              Dupliquer
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Aperçu
                            </Button>
                            {campaign.status === 'Brouillon' && (
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                <Send className="w-4 h-4 mr-1" />
                                Envoyer
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer campagne
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Gérer listes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planifier envoi
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Suggestion IA</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimisez vos lignes d'objet pour +15% d'ouvertures
                  </p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Optimiser maintenant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <Card>
            <CardHeader>
              <CardTitle>Templates Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templatesData.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                    <Badge variant="outline" className="mb-3">{template.category}</Badge>
                    <div className="text-sm text-gray-600 mb-3">
                      Utilisé {template.usage} fois
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Aperçu
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                        Utiliser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle>Performance des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="envois" stroke="#3B82F6" strokeWidth={2} name="Envois" />
                  <Line type="monotone" dataKey="ouvertures" stroke="#10B981" strokeWidth={2} name="Ouvertures" />
                  <Line type="monotone" dataKey="clics" stroke="#8B5CF6" strokeWidth={2} name="Clics" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmailCampaigns;
