
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Play, Pause, Settings, Users, TrendingUp, Clock, Mail, MessageSquare } from 'lucide-react';

const AdminCampaignsAutomationPage = () => {
  const automations = [
    {
      id: 1,
      name: 'Séquence Onboarding',
      description: 'Emails de bienvenue pour nouveaux clients',
      type: 'email',
      status: 'active',
      triggers: 156,
      conversions: 23,
      conversionRate: 14.7,
      steps: 5,
      createdDate: '2024-01-10',
      lastTrigger: '2 heures'
    },
    {
      id: 2,
      name: 'Rappel Panier Abandonné',
      description: 'Récupération des paniers abandonnés',
      type: 'email',
      status: 'active',
      triggers: 89,
      conversions: 12,
      conversionRate: 13.5,
      steps: 3,
      createdDate: '2024-01-08',
      lastTrigger: '30 minutes'
    },
    {
      id: 3,
      name: 'Réactivation Clients Inactifs',
      description: 'Campagne de réengagement via email et SMS',
      type: 'mixed',
      status: 'paused',
      triggers: 234,
      conversions: 18,
      conversionRate: 7.7,
      steps: 4,
      createdDate: '2024-01-05',
      lastTrigger: '3 jours'
    },
    {
      id: 4,
      name: 'Upsell Services Premium',
      description: 'Proposition de services premium aux clients bronze',
      type: 'email',
      status: 'draft',
      triggers: 0,
      conversions: 0,
      conversionRate: 0,
      steps: 3,
      createdDate: '2024-01-14',
      lastTrigger: 'Jamais'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'paused':
        return 'En pause';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'sms':
        return MessageSquare;
      case 'mixed':
        return Zap;
      default:
        return Mail;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-50 text-blue-700';
      case 'sms':
        return 'bg-green-50 text-green-700';
      case 'mixed':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const statsData = [
    { label: 'Automatisations', value: automations.length, icon: Zap, color: 'text-blue-500' },
    { label: 'Automatisations actives', value: automations.filter(a => a.status === 'active').length, icon: Play, color: 'text-green-500' },
    { label: 'Déclenchements totaux', value: '479', icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Taux de conversion moyen', value: '11.9%', icon: Users, color: 'text-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Automatisation Marketing</h1>
            <p className="text-gray-500 mt-2">Créer et gérer vos séquences automatisées</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle automatisation
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Liste des automatisations */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les automatisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation) => {
                const TypeIcon = getTypeIcon(automation.type);
                return (
                  <div key={automation.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{automation.name}</h3>
                          <p className="text-sm text-gray-600">{automation.description}</p>
                        </div>
                        <Badge className={getStatusColor(automation.status)}>
                          {getStatusLabel(automation.status)}
                        </Badge>
                        <Badge variant="outline" className={getTypeColor(automation.type)}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {automation.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {automation.status === 'active' && (
                          <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-700">
                            <Pause className="w-4 h-4" />
                          </Button>
                        )}
                        {automation.status === 'paused' && (
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Étapes:</span>
                        <span className="ml-1 font-medium">{automation.steps}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Déclenchements:</span>
                        <span className="ml-1 font-medium">{automation.triggers}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Conversions:</span>
                        <span className="ml-1 font-medium">{automation.conversions}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Taux:</span>
                        <span className="ml-1 font-medium">{automation.conversionRate}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Dernier déclenchement:</span>
                        <span className="ml-1 font-medium">{automation.lastTrigger}</span>
                      </div>
                    </div>
                    
                    {automation.status === 'active' && (
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-white p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">Taux de conversion</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${automation.conversionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{automation.conversionRate}%</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500">Performance</p>
                              <p className="text-lg font-bold text-gray-900">{automation.conversions}/{automation.triggers}</p>
                            </div>
                            <TrendingUp className={`w-6 h-6 ${automation.conversionRate > 10 ? 'text-green-500' : 'text-orange-500'}`} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Modèles d'automatisation */}
        <Card>
          <CardHeader>
            <CardTitle>Modèles d'automatisation populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <h4 className="font-medium">Bienvenue Nouveaux Clients</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Séquence d'emails de bienvenue sur 7 jours</p>
                <Button variant="outline" size="sm" className="w-full">Utiliser ce modèle</Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h4 className="font-medium">Nurturing Prospects</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Éducation et conversion de prospects qualifiés</p>
                <Button variant="outline" size="sm" className="w-full">Utiliser ce modèle</Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-purple-500" />
                  <h4 className="font-medium">Fidélisation Clients</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Maintenir l'engagement des clients existants</p>
                <Button variant="outline" size="sm" className="w-full">Utiliser ce modèle</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsAutomationPage;
