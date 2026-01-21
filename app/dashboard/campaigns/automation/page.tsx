"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Play,
  Pause,
  Settings,
  ArrowUp, 
  ArrowDown,
  Plus,
  Eye,
  Edit,
  Clock,
  Mail,
  MessageSquare,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AutomationCampaignsPage() {
  const [activeTab, setActiveTab] = useState('workflows');

  const automationData = [
    { name: 'Lun', executions: 120, conversions: 24 },
    { name: 'Mar', executions: 180, conversions: 36 },
    { name: 'Mer', executions: 150, conversions: 30 },
    { name: 'Jeu', executions: 220, conversions: 44 },
    { name: 'Ven', executions: 280, conversions: 56 },
    { name: 'Sam', executions: 190, conversions: 38 },
    { name: 'Dim', executions: 140, conversions: 28 }
  ];

  const workflowsData = [
    { id: 1, name: 'Onboarding Nouveaux Clients', status: 'Actif', trigger: 'Inscription', executions: 1234, conversions: 456, rate: 37 },
    { id: 2, name: 'Relance Panier Abandonné', status: 'Actif', trigger: 'Abandon panier', executions: 890, conversions: 178, rate: 20 },
    { id: 3, name: 'Lead Nurturing', status: 'Actif', trigger: 'Nouveau lead', executions: 567, conversions: 113, rate: 20 },
    { id: 4, name: 'Réactivation Inactifs', status: 'Pausé', trigger: '30j inactivité', executions: 234, conversions: 35, rate: 15 },
    { id: 5, name: 'Anniversary Email', status: 'Actif', trigger: 'Date anniversaire', executions: 156, conversions: 47, rate: 30 }
  ];

  const triggersData = [
    { name: 'Inscription', icon: Users, count: 1234 },
    { name: 'Achat', icon: Target, count: 567 },
    { name: 'Email ouvert', icon: Mail, count: 890 },
    { name: 'Page visitée', icon: Eye, count: 456 },
    { name: 'Formulaire soumis', icon: MessageSquare, count: 234 }
  ];

  const quickStats = [
    { title: 'Workflows actifs', value: '4', change: '+1', positive: true, icon: Zap },
    { title: 'Exécutions/jour', value: '1,280', change: '+15.3%', positive: true, icon: Play },
    { title: 'Taux conversion', value: '24.5%', change: '+3.2%', positive: true, icon: TrendingUp },
    { title: 'Temps moyen', value: '2.4h', change: '-0.5h', positive: true, icon: Clock }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Pausé': return 'bg-yellow-100 text-yellow-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              Automation Marketing
            </h1>
            <p className="text-gray-600">Automatisez vos campagnes et workflows</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-100 text-yellow-800">
              <Zap className="w-3 h-3 mr-1" />
              4 workflows actifs
            </Badge>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau workflow
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-yellow-500" />
                    <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
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

        <div className="border-b">
          <nav className="flex space-x-8">
            {['workflows', 'triggers', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'workflows' ? 'Workflows' : tab === 'triggers' ? 'Déclencheurs' : 'Analytics'}
              </button>
            ))}
          </nav>
        </div>

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
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                              <p className="text-sm text-gray-600">Déclencheur: {workflow.trigger}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                            <Button variant="ghost" size="icon">
                              {workflow.status === 'Actif' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Exécutions</div>
                            <div className="font-medium">{workflow.executions.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversions</div>
                            <div className="font-medium">{workflow.conversions.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Taux</div>
                            <div className="font-medium text-green-600">{workflow.rate}%</div>
                          </div>
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
                      Configurer triggers
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir logs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Suggestion IA</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Créez un workflow de réactivation pour vos clients inactifs
                  </p>
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Créer workflow
                  </Button>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {triggersData.map((trigger, index) => {
                  const TriggerIcon = trigger.icon;
                  return (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <TriggerIcon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{trigger.name}</h4>
                          <p className="text-sm text-gray-600">{trigger.count} déclenchements</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-1" />
                        Utiliser ce trigger
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle>Performance des Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={automationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="executions" stroke="#EAB308" strokeWidth={2} name="Exécutions" />
                  <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
