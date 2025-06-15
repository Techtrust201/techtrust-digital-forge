
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Plus, Send, Users, TrendingUp, Eye, Calendar, Edit } from 'lucide-react';
import { useEmailCampaigns, useCampaignActions } from '@/hooks/useCampaignData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminCampaignsEmailPage = () => {
  const { data: emailCampaigns, isLoading } = useEmailCampaigns();
  const { createEmailCampaign, sendEmailCampaign } = useCampaign

Actions();
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'newsletter' as const,
  });

  const handleCreateCampaign = async () => {
    await createEmailCampaign.mutateAsync({
      ...newCampaign,
      status: 'draft',
      recipients: 0,
      open_rate: 0,
      click_rate: 0,
    });
    setNewCampaign({ name: '', subject: '', content: '', type: 'newsletter' });
    setShowNewCampaignModal(false);
  };

  const handleSendCampaign = async (id: string) => {
    await sendEmailCampaign.mutateAsync(id);
  };

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

  const totalCampaigns = emailCampaigns?.length || 0;
  const totalSent = emailCampaigns?.reduce((sum, campaign) => sum + campaign.recipients, 0) || 0;
  const avgOpenRate = emailCampaigns?.length 
    ? (emailCampaigns.reduce((sum, campaign) => sum + campaign.open_rate, 0) / emailCampaigns.length).toFixed(1)
    : '0';
  const activeSubscribers = 3200; // Mock data

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
            <p className="text-gray-500 mt-2">Gérer et analyser vos campagnes email</p>
          </div>
          <Dialog open={showNewCampaignModal} onOpenChange={setShowNewCampaignModal}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle campagne
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une campagne email</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nom de la campagne"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
                <Input
                  placeholder="Objet de l'email"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                />
                <Textarea
                  placeholder="Contenu de l'email"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  rows={10}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreateCampaign} 
                    disabled={createEmailCampaign.isPending || !newCampaign.name || !newCampaign.subject}
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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{totalCampaigns}</p>
                  <p className="text-sm text-gray-500">Campagnes totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Send className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Emails envoyés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{avgOpenRate}%</p>
                  <p className="text-sm text-gray-500">Taux d'ouverture moyen</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{activeSubscribers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Abonnés actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des campagnes */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les campagnes email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailCampaigns?.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-green-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button 
                          size="sm" 
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleSendCampaign(campaign.id)}
                          disabled={sendEmailCampaign.isPending}
                        >
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
                          <span>{campaign.open_rate}% ouvertures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span>{campaign.click_rate}% clics</span>
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
                  
                  {(campaign.status === 'sent' || campaign.status === 'active') && (
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-500 mb-1">Taux d'ouverture</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${campaign.open_rate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{campaign.open_rate}%</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-500 mb-1">Taux de clic</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${campaign.click_rate * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{campaign.click_rate}%</span>
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
