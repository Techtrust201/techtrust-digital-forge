"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Mail,
  MessageSquare,
  Users,
  Plus
} from 'lucide-react';

export default function AdminCampaignsPage() {
  const campaigns = [
    { 
      id: 1,
      name: 'Newsletter Janvier',
      type: 'Email',
      status: 'sent',
      recipients: 1234,
      openRate: '42.5%',
      clickRate: '12.3%'
    },
    { 
      id: 2,
      name: 'Promo Black Friday',
      type: 'SMS',
      status: 'scheduled',
      recipients: 567,
      openRate: '-',
      clickRate: '-'
    },
    { 
      id: 3,
      name: 'Lead Magnet Tech',
      type: 'Lead Gen',
      status: 'active',
      recipients: 234,
      openRate: '65.2%',
      clickRate: '28.1%'
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Email': return Mail;
      case 'SMS': return MessageSquare;
      case 'Lead Gen': return Users;
      default: return Zap;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Campagnes</h1>
            <p className="text-gray-400">Gérez toutes les campagnes marketing</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-white">{campaigns.length}</p>
              <p className="text-sm text-gray-400">Total campagnes</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-400">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-400">Actives</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-400">
                {campaigns.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Destinataires</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-purple-400">45.2%</p>
              <p className="text-sm text-gray-400">Taux d&apos;ouverture moyen</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns list */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Toutes les campagnes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Campagne</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Destinataires</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Taux ouverture</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Taux clic</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <tr key={campaign.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-4 px-4 text-white font-medium">{campaign.name}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <TypeIcon className="w-4 h-4" />
                            {campaign.type}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300">{campaign.recipients}</td>
                        <td className="py-4 px-4 text-gray-300">{campaign.openRate}</td>
                        <td className="py-4 px-4 text-gray-300">{campaign.clickRate}</td>
                        <td className="py-4 px-4">
                          <Badge className={
                            campaign.status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                            campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }>
                            {campaign.status === 'sent' ? 'Envoyée' :
                             campaign.status === 'active' ? 'Active' : 'Planifiée'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
