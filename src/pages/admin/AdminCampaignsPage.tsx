
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Plus,
  Send,
  Clock,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCampaignActions } from '@/hooks/useCampaignActions';

const AdminCampaignsPage = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    recipients: []
  });

  const { sendEmailNow, scheduleCampaign, previewCampaign, createSequence, isLoading } = useCampaignActions();

  const handleSendNow = async () => {
    if (!newCampaign.subject || !newCampaign.content) return;
    
    await sendEmailNow(newCampaign);
    setNewCampaign({ subject: '', content: '', recipients: [] });
    setShowNewCampaignModal(false);
  };

  const handleSchedule = async () => {
    const scheduledDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h plus tard
    await scheduleCampaign(newCampaign, scheduledDate);
    setNewCampaign({ subject: '', content: '', recipients: [] });
    setShowNewCampaignModal(false);
  };

  const handlePreview = async () => {
    await previewCampaign(newCampaign);
  };

  const renderEmailCampaigns = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Créer un email</h3>
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
                placeholder="Objet de l'email"
                value={newCampaign.subject}
                onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
              />
              <Textarea
                placeholder="Contenu de l'email"
                value={newCampaign.content}
                onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                rows={10}
              />
              <div className="flex gap-2">
                <Button onClick={handleSendNow} disabled={isLoading}>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer maintenant
                </Button>
                <Button variant="outline" onClick={handleSchedule} disabled={isLoading}>
                  <Clock className="w-4 h-4 mr-2" />
                  Programmer
                </Button>
                <Button variant="outline" onClick={handlePreview} disabled={isLoading}>
                  <Eye className="w-4 h-4 mr-2" />
                  Aperçu
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Créer une séquence</h4>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => createSequence('email', { name: 'Séquence Email', steps: [] })}
                disabled={isLoading}
              >
                <Mail className="w-6 h-6 mb-2" />
                Séquence Email
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => createSequence('sms', { name: 'Séquence SMS', steps: [] })}
                disabled={isLoading}
              >
                <MessageSquare className="w-6 h-6 mb-2" />
                Séquence SMS
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => createSequence('mixed', { name: 'Séquence Mixte', steps: [] })}
                disabled={isLoading}
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                Séquence Mixte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSMSCampaigns = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">SMS Marketing</h3>
        <Button className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau SMS
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Interface SMS Marketing en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campagnes Marketing</h1>
          <p className="text-gray-500 mt-2">Créez et gérez vos campagnes email et SMS</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
              <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'ouverture</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clics</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+8.2% vs mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnés</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,923</div>
              <p className="text-xs text-muted-foreground">+156 ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation tabs */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'email', label: 'Email Marketing' },
              { id: 'sms', label: 'SMS Marketing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'email' && renderEmailCampaigns()}
          {activeTab === 'sms' && renderSMSCampaigns()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsPage;
