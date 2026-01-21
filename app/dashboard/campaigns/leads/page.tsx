"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  Plus,
  Eye,
  Edit,
  Filter,
  Download,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export default function LeadCampaignsPage() {
  const [activeTab, setActiveTab] = useState('campaigns');

  const leadData = [
    { name: 'Sem 1', leads: 120, qualifies: 48, convertis: 12 },
    { name: 'Sem 2', leads: 180, qualifies: 72, convertis: 18 },
    { name: 'Sem 3', leads: 240, qualifies: 96, convertis: 24 },
    { name: 'Sem 4', leads: 320, qualifies: 128, convertis: 32 }
  ];

  const sourceData = [
    { name: 'Landing Pages', value: 35, color: '#3B82F6', leads: 450 },
    { name: 'Réseaux Sociaux', value: 28, color: '#10B981', leads: 360 },
    { name: 'SEO', value: 22, color: '#8B5CF6', leads: 280 },
    { name: 'Publicités', value: 15, color: '#F59E0B', leads: 195 }
  ];

  const campaignsData = [
    { id: 1, name: 'Webinar Growth Hacking', status: 'Actif', leads: 234, qualified: 89, converted: 23, cost: 450, roi: '287%', source: 'Landing Page' },
    { id: 2, name: 'eBook Marketing Digital', status: 'Actif', leads: 156, qualified: 62, converted: 18, cost: 320, roi: '234%', source: 'LinkedIn Ads' },
    { id: 3, name: 'Consultation Gratuite', status: 'Pausé', leads: 89, qualified: 45, converted: 12, cost: 280, roi: '156%', source: 'Google Ads' },
    { id: 4, name: 'Newsletter Premium', status: 'Planifié', leads: 0, qualified: 0, converted: 0, cost: 150, roi: '-', source: 'Email' }
  ];

  const leadsListData = [
    { id: 1, name: 'Marie Dubois', email: 'marie@startup.com', company: 'StartupTech', score: 85, status: 'Chaud', source: 'Webinar', date: '2024-01-16' },
    { id: 2, name: 'Pierre Martin', email: 'p.martin@agency.fr', company: 'Digital Agency', score: 72, status: 'Qualifié', source: 'LinkedIn', date: '2024-01-15' },
    { id: 3, name: 'Sophie Laurent', email: 'sophie@ecommerce.com', company: 'E-commerce Plus', score: 68, status: 'Nouveau', source: 'Google Ads', date: '2024-01-14' }
  ];

  const quickStats = [
    { title: 'Leads générés', value: '1,847', change: '+23.4%', positive: true, icon: Target },
    { title: 'Taux qualification', value: '42.3%', change: '+5.1%', positive: true, icon: Users },
    { title: 'Coût par lead', value: '€12.50', change: '-€2.30', positive: true, icon: DollarSign },
    { title: 'ROI moyen', value: '245%', change: '+18.7%', positive: true, icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Pausé': return 'bg-yellow-100 text-yellow-800';
      case 'Planifié': return 'bg-blue-100 text-blue-800';
      case 'Chaud': return 'bg-red-100 text-red-800';
      case 'Qualifié': return 'bg-blue-100 text-blue-800';
      case 'Nouveau': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="w-8 h-8 text-orange-500" />
              Lead Generation
            </h1>
            <p className="text-gray-600">Générez et qualifiez vos prospects efficacement</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-100 text-orange-800">
              <Target className="w-3 h-3 mr-1" />
              4 campagnes actives
            </Badge>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle campagne
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
                    <StatIcon className="w-8 h-8 text-orange-500" />
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
            {['campaigns', 'leads', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'campaigns' ? 'Campagnes' : tab === 'leads' ? 'Base de Leads' : 'Analytics'}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'campaigns' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Campagnes Lead Gen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignsData.map((campaign) => (
                      <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-orange-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                              <p className="text-sm text-gray-600">{campaign.source}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4 text-sm mb-3">
                          <div>
                            <div className="text-gray-500">Leads</div>
                            <div className="font-medium">{campaign.leads}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Qualifiés</div>
                            <div className="font-medium">{campaign.qualified}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Convertis</div>
                            <div className="font-medium">{campaign.converted}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Coût</div>
                            <div className="font-medium">€{campaign.cost}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">ROI</div>
                            <div className="font-medium text-green-600">{campaign.roi}</div>
                          </div>
                        </div>
                        
                        {campaign.leads > 0 && (
                          <div className="space-y-2">
                            <div className="text-xs text-gray-600">Taux de qualification</div>
                            <Progress value={(campaign.qualified / campaign.leads) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-500" />
                    Sources de Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                        {sourceData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {sourceData.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                          <span className="text-sm">{source.name}</span>
                        </div>
                        <span className="text-sm font-medium">{source.leads}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer landing page
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Filter className="w-4 h-4 mr-2" />
                      Qualifier leads
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter données
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Optimisation IA</h3>
                  <p className="text-sm text-gray-600 mb-4">Améliorez votre scoring de 15%</p>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Optimiser maintenant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Base de Leads</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-1" />
                        Filtrer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leadsListData.map((lead) => (
                      <div key={lead.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{lead.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{lead.name}</h4>
                              <p className="text-sm text-gray-600">{lead.email}</p>
                              <p className="text-sm text-gray-500">{lead.company}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                              Score: {lead.score}/100
                            </div>
                            <Badge className={`${getStatusColor(lead.status)} mt-1`}>{lead.status}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Source: {lead.source}</span>
                            <span>Date: {lead.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="w-4 h-4 mr-1" />
                              Email
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-1" />
                              Appeler
                            </Button>
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
                  <h3 className="font-bold text-gray-900 mb-4">Statistiques Leads</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total leads</span>
                      <span className="font-medium">1,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Leads chauds</span>
                      <span className="font-medium text-red-600">234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Qualifiés</span>
                      <span className="font-medium text-blue-600">782</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Convertis</span>
                      <span className="font-medium text-green-600">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Score Moyen</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">74/100</div>
                    <Progress value={74} className="mb-4" />
                    <p className="text-sm text-gray-600">Qualité de lead en amélioration</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#F97316" strokeWidth={2} name="Leads générés" />
                    <Line type="monotone" dataKey="qualifies" stroke="#3B82F6" strokeWidth={2} name="Qualifiés" />
                    <Line type="monotone" dataKey="convertis" stroke="#10B981" strokeWidth={2} name="Convertis" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance par Source</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#F97316" name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
