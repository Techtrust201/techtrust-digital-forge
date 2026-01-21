
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  TrendingUp, 
  Users, 
  ArrowUp, 
  ArrowDown,
  Plus,
  Eye,
  Edit,
  Copy,
  Calendar,
  Mail,
  MessageSquare,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AutomationCampaigns = () => {
  const [activeTab, setActiveTab] = useState('workflows');

  // Données simulées pour l'automation
  const automationData = [
    { name: 'Sem 1', emails: 450, sms: 120, conversions: 56 },
    { name: 'Sem 2', emails: 520, sms: 140, conversions: 67 },
    { name: 'Sem 3', emails: 680, sms: 180, conversions: 89 },
    { name: 'Sem 4', emails: 820, sms: 220, conversions: 112 }
  ];

  const workflowsData = [
    {
      id: 1,
      name: 'Séquence Bienvenue Nouveau Client',
      status: 'Actif',
      triggers: 245,
      completed: 189,
      conversion: 77,
      type: 'Onboarding',
      steps: 5,
      lastTrigger: '2h'
    },
    {
      id: 2,
      name: 'Nurturing Lead Webinar',
      status: 'Actif',
      triggers: 156,
      completed: 98,
      conversion: 63,
      type: 'Lead Nurturing',
      steps: 7,
      lastTrigger: '4h'
    },
    {
      id: 3,
      name: 'Réactivation Client Inactif',
      status: 'Pausé',
      triggers: 89,
      completed: 34,
      conversion: 38,
      type: 'Rétention',
      steps: 4,
      lastTrigger: '2j'
    },
    {
      id: 4,
      name: 'Cross-sell Service Premium',
      status: 'Brouillon',
      triggers: 0,
      completed: 0,
      conversion: 0,
      type: 'Upsell',
      steps: 6,
      lastTrigger: '-'
    }
  ];

  const triggersData = [
    { name: 'Inscription Newsletter', workflows: 3, usage: 245 },
    { name: 'Téléchargement eBook', workflows: 2, usage: 156 },
    { name: 'Abandon Panier', workflows: 1, usage: 89 },
    { name: 'Inactivité 30j', workflows: 1, usage: 67 },
    { name: 'Visite Page Pricing', workflows: 2, usage: 134 }
  ];

  const templatesData = [
    { id: 1, name: 'Email Bienvenue', type: 'Email', category: 'Onboarding', usage: 45 },
    { id: 2, name: 'SMS Rappel RDV', type: 'SMS', category: 'Service', usage: 78 },
    { id: 3, name: 'Email Nurturing B2B', type: 'Email', category: 'Lead Gen', usage: 34 },
    { id: 4, name: 'Email Promotion', type: 'Email', category: 'Marketing', usage: 56 }
  ];

  const quickStats = [
    {
      title: 'Workflows actifs',
      value: '12',
      change: '+3',
      positive: true,
      icon: Zap
    },
    {
      title: 'Taux complétion',
      value: '84.2%',
      change: '+6.3%',
      positive: true,
      icon: CheckCircle
    },
    {
      title: 'Gains de temps',
      value: '45h/sem',
      change: '+12h',
      positive: true,
      icon: Clock
    },
    {
      title: 'ROI automation',
      value: '340%',
      change: '+28%',
      positive: true,
      icon: TrendingUp
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Pausé': return 'bg-yellow-100 text-yellow-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Onboarding': return 'bg-blue-100 text-blue-800';
      case 'Lead Nurturing': return 'bg-purple-100 text-purple-800';
      case 'Rétention': return 'bg-orange-100 text-orange-800';
      case 'Upsell': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-500" />
              Marketing Automation
            </h1>
            <p className="text-gray-600">
              Automatisez vos campagnes et workflows marketing
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="w-3 h-3 mr-1" />
              12 workflows actifs
            </Badge>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau workflow
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

        {/* Onglets */}
        <div className="border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workflows'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Workflows
            </button>
            <button
              onClick={() => setActiveTab('triggers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'triggers'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Déclencheurs
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Performance
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'workflows' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflowsData.map((workflow) => (
                      <div key={workflow.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-purple-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={getTypeColor(workflow.type)}>
                                  {workflow.type}
                                </Badge>
                                <span className="text-sm text-gray-600">{workflow.steps} étapes</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(workflow.status)}>
                              {workflow.status}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <div className="text-gray-500">Déclenchés</div>
                            <div className="font-medium">{workflow.triggers}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Complétés</div>
                            <div className="font-medium">{workflow.completed}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Taux complétion</div>
                            <div className="font-medium">{((workflow.completed / workflow.triggers) * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Dernière activité</div>
                            <div className="font-medium">{workflow.lastTrigger}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Progression</span>
                            <span>{workflow.completed}/{workflow.triggers}</span>
                          </div>
                          <Progress value={(workflow.completed / workflow.triggers) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir détails
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-1" />
                            Dupliquer
                          </Button>
                          {workflow.status === 'Actif' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="w-4 h-4 mr-1" />
                              Mettre en pause
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                              <Play className="w-4 h-4 mr-1" />
                              Activer
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
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
                      Créer workflow
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Templates prêts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyser performance
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">IA Recommendation</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Créez un workflow de réactivation pour +23% d'engagement
                  </p>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                    Créer maintenant
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Économies de Temps</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">45h/sem</div>
                    <p className="text-sm text-gray-600 mb-4">
                      Temps économisé grâce à l'automation
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Emails automatiques</span>
                        <span className="font-medium">28h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead scoring</span>
                        <span className="font-medium">12h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Segmentation</span>
                        <span className="font-medium">5h</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'triggers' && (
          <Card>
            <CardHeader>
              <CardTitle>Déclencheurs Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {triggersData.map((trigger, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{trigger.name}</h4>
                        <p className="text-sm text-gray-600">
                          Utilisé dans {trigger.workflows} workflow{trigger.workflows > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">{trigger.usage}</div>
                        <div className="text-sm text-gray-500">déclenchements</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'templates' && (
          <Card>
            <CardHeader>
              <CardTitle>Templates d'Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templatesData.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      {template.type === 'Email' ? (
                        <Mail className="w-8 h-8 text-blue-500" />
                      ) : (
                        <MessageSquare className="w-8 h-8 text-green-500" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Type: {template.type} • Utilisé {template.usage} fois
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Aperçu
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
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
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance des Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={automationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="emails" stroke="#8B5CF6" strokeWidth={2} name="Emails envoyés" />
                    <Line type="monotone" dataKey="sms" stroke="#10B981" strokeWidth={2} name="SMS envoyés" />
                    <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité par Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={automationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emails" fill="#8B5CF6" name="Emails" />
                    <Bar dataKey="sms" fill="#10B981" name="SMS" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AutomationCampaigns;
