
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Plus, Send, Users, Clock, CheckCircle, Calendar, Edit } from 'lucide-react';
import { useSMSCampaigns, useCampaignActions } from '@/hooks/useCampaignData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminCampaignsSMSPage = () => {
  const { data: smsCampaigns, isLoading } = useSMSCampaigns();
  const { createSMSCampaign, sendSMSCampaign } = useCampaignActions();
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
  });

  const handleCreateCampaign = async () => {
    await createSMSCampaign.mutateAsync({
      ...newCampaign,
      status: 'draft',
      recipients: 0,
      delivered: 0,
      delivery_rate: 0,
      cost: 0,
    });
    setNewCampaign({ name: '', message: '' });
    setShowNewCampaignModal(false);
  };

  const handleSendCampaign = async (id: string) => {
    await sendSMSCampaign.mutateAsync(id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
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
      case 'draft':
        return 'Brouillon';
      case 'failed':
        return 'Échec';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const totalCampaigns = smsCampaigns?.length || 0;
  const totalSent = smsCampaigns?.reduce((sum, campaign) => sum + campaign.recipients, 0) || 0;
  const avgDeliveryRate = smsCampaigns?.length 
    ? (smsCampaigns.reduce((sum, campaign) => sum + campaign.delivery_rate, 0) / smsCampaigns.length).toFixed(1)
    : '0';
  const totalCost = smsCampaigns?.reduce((sum, campaign) => sum + campaign.cost, 0) || 0;

  const statsData = [
    { label: 'Campagnes SMS', value: totalCampaigns, icon: MessageSquare, color: 'text-blue-500' },
    { label: 'SMS envoyés', value: totalSent.toLocaleString(), icon: Send, color: 'text-green-500' },
    { label: 'Taux de livraison', value: `${avgDeliveryRate}%`, icon: CheckCircle, color: 'text-purple-500' },
    { label: 'Coût total', value: `€${totalCost.toFixed(2)}`, icon: Clock, color: 'text-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SMS Marketing</h1>
            <p className="text-gray-500 mt-2">Gérer et analyser vos campagnes SMS</p>
          </div>
          <Dialog open={showNewCampaignModal} onOpenChange={setShowNewCampaignModal}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle campagne SMS
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une campagne SMS</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nom de la campagne"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
                <div>
                  <Textarea
                    placeholder="Message SMS (160 caractères max)"
                    value={newCampaign.message}
                    onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value.slice(0, 160) })}
                    rows={4}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {newCampaign.message.length}/160 caractères
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreateCampaign} 
                    disabled={createSMSCampaign.isPending || !newCampaign.name || !newCampaign.message}
                  >
                    Créer la campagne
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="hover:shadow-lg transition-shadow cursor-pointer">
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

        {/* Liste des campagnes SMS */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les campagnes SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {smsCampaigns?.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-green-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button 
                          size="sm" 
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleSendCampaign(campaign.id)}
                          disabled={sendSMSCampaign.isPending}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-3">
                    <p className="text-gray-900 text-sm">{campaign.message}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {campaign.message.length}/160 caractères
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{campaign.recipients.toLocaleString()} destinataires</span>
                    </div>
                    {campaign.status === 'sent' && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-gray-400" />
                          <span>{campaign.delivered} livrés ({campaign.delivery_rate.toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>€{campaign.cost.toFixed(2)} coût</span>
                        </div>
                      </>
                    )}
                    {campaign.sent_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(campaign.sent_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {campaign.status === 'sent' && (
                    <div className="mt-3">
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-500 mb-1">Taux de livraison</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${campaign.delivery_rate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{campaign.delivery_rate.toFixed(1)}%</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          {campaign.delivered}/{campaign.recipients} SMS livrés
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informations importantes */}
        <Card>
          <CardHeader>
            <CardTitle>Informations importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <h4 className="font-medium text-blue-800 mb-1">Coût par SMS</h4>
                <p className="text-blue-700">0.10€ par SMS en France, 0.15€ à l'international</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">
                <h4 className="font-medium text-yellow-800 mb-1">Limite de caractères</h4>
                <p className="text-yellow-700">160 caractères max par SMS. Au-delà, le message sera divisé.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <h4 className="font-medium text-green-800 mb-1">Heures d'envoi</h4>
                <p className="text-green-700">Envois autorisés de 8h à 20h du lundi au samedi.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsSMSPage;
