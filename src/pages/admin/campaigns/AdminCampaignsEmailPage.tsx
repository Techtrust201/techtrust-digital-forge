
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus, Send, Users, TrendingUp, Eye, Calendar, Edit } from 'lucide-react';

const AdminCampaignsEmailPage = () => {
  const emailCampaigns = [
    {
      id: 1,
      name: 'Newsletter Janvier 2024',
      subject: 'Découvrez nos nouveaux services',
      status: 'sent',
      recipients: 1247,
      openRate: 24.5,
      clickRate: 3.2,
      sentDate: '2024-01-15',
      type: 'newsletter'
    },
    {
      id: 2,
      name: 'Promotion Growth Hacking',
      subject: '50% de réduction sur nos formations',
      status: 'scheduled',
      recipients: 834,
      openRate: 0,
      clickRate: 0,
      sentDate: '2024-01-20',
      type: 'promotion'
    },
    {
      id: 3,
      name: 'Onboarding Nouveaux Clients',
      subject: 'Bienvenue chez Techtrust !',
      status: 'active',
      recipients: 156,
      openRate: 67.3,
      clickRate: 12.8,
      sentDate: '2024-01-10',
      type: 'automation'
    },
    {
      id: 4,
      name: 'Rappel Webinar SEO',
      subject: 'N\'oubliez pas notre webinar de demain',
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      sentDate: null,
      type: 'event'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Envoyé';
      case 'scheduled':
        return 'Programmé';
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'newsletter':
        return 'bg-blue-50 text-blue-700';
      case 'promotion':
        return 'bg-orange-50 text-orange-700';
      case 'automation':
        return 'bg-purple-50 text-purple-700';
      case 'event':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const statsData = [
    { label: 'Campagnes totales', value: emailCampaigns.length, icon: Mail, color: 'text-blue-500' },
    { label: 'Emails envoyés', value: '12.4K', icon: Send, color: 'text-green-500' },
    { label: 'Taux d\'ouverture moyen', value: '28.7%', icon: Eye, color: 'text-purple-500' },
    { label: 'Abonnés actifs', value: '3.2K', icon: Users, color: 'text-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
            <p className="text-gray-500 mt-2">Gérer et analyser vos campagnes email</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle campagne
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

        {/* Liste des campagnes */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les campagnes email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(campaign.type)}>
                        {campaign.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">Objet: {campaign.subject}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{campaign.recipients.toLocaleString()} destinataires</span>
                    </div>
                    {campaign.status === 'sent' && (
                      <>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span>{campaign.openRate}% ouvertures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span>{campaign.clickRate}% clics</span>
                        </div>
                      </>
                    )}
                    {campaign.sentDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{campaign.sentDate}</span>
                      </div>
                    )}
                  </div>
                  
                  {(campaign.status === 'sent' || campaign.status === 'active') && (
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-500 mb-1">Taux d'ouverture</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${campaign.openRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{campaign.openRate}%</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-500 mb-1">Taux de clic</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${campaign.clickRate * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{campaign.clickRate}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsEmailPage;
