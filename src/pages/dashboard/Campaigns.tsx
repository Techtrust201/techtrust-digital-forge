
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  MessageSquare, 
  Users, 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp,
  Calendar,
  Target,
  Send,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    subject: '',
    content: '',
    target: 'all'
  });
  const [userData] = useState(() => {
    const user = localStorage.getItem('techtrust_user');
    return user ? JSON.parse(user) : null;
  });

  // Données simulées basées sur le profil utilisateur
  const getCampaignLimits = () => {
    switch(userData?.tier) {
      case 'diamond':
        return { emails: 50000, sms: 10000, leads: 10000, automation: 'unlimited' };
      case 'gold':
        return { emails: 20000, sms: 5000, leads: 5000, automation: 50 };
      case 'silver':
        return { emails: 10000, sms: 2000, leads: 2000, automation: 20 };
      default:
        return { emails: 2000, sms: 500, leads: 500, automation: 5 };
    }
  };

  const getCampaignData = () => {
    const limits = getCampaignLimits();
    const used = {
      emails: Math.floor(limits.emails * 0.35),
      sms: Math.floor(limits.sms * 0.22),
      leads: Math.floor(limits.leads * 0.48),
      automation: typeof limits.automation === 'number' ? Math.floor(limits.automation * 0.60) : 15
    };

    return {
      limits,
      used,
      campaigns: [
        {
          id: 1,
          name: 'Newsletter Janvier 2025',
          type: 'email',
          status: 'sent',
          sent: 2450,
          opened: 980,
          clicked: 156,
          converted: 23,
          revenue: 4500,
          date: '2025-01-15',
          openRate: 40,
          ctr: 6.4,
          conversionRate: 0.9
        },
        {
          id: 2,
          name: 'Promo Flash Week-end',
          type: 'sms',
          status: 'sent',
          sent: 850,
          opened: 782,
          clicked: 234,
          converted: 45,
          revenue: 2800,
          date: '2025-01-12',
          openRate: 92,
          ctr: 27.5,
          conversionRate: 5.3
        },
        {
          id: 3,
          name: 'Lead Magnet eBook',
          type: 'lead',
          status: 'active',
          sent: 0,
          opened: 0,
          clicked: 445,
          converted: 334,
          revenue: 0,
          date: '2025-01-10',
          openRate: 0,
          ctr: 75.1,
          conversionRate: 75.1
        },
        {
          id: 4,
          name: 'Séquence Onboarding',
          type: 'automation',
          status: 'active',
          sent: 1250,
          opened: 856,
          clicked: 298,
          converted: 89,
          revenue: 8900,
          date: '2025-01-08',
          openRate: 68.5,
          ctr: 23.8,
          conversionRate: 7.1
        },
        {
          id: 5,
          name: 'Campagne de Retargeting',
          type: 'email',
          status: 'scheduled',
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          revenue: 0,
          date: '2025-01-20',
          openRate: 0,
          ctr: 0,
          conversionRate: 0
        }
      ]
    };
  };

  const campaignData = getCampaignData();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'lead': return Target;
      case 'automation': return Zap;
      default: return Mail;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'email': return 'text-blue-500';
      case 'sms': return 'text-green-500';
      case 'lead': return 'text-purple-500';
      case 'automation': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const handleCreateCampaign = () => {
    // Simuler la création d'une campagne
    alert(`🚀 Campagne "${newCampaign.name}" créée avec succès ! Elle sera lancée dans quelques minutes.`);
    setNewCampaign({ name: '', type: 'email', subject: '', content: '', target: 'all' });
    setActiveTab('overview');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Crédits restants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-blue-500" />
              <Badge variant="outline">Emails</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Utilisés</span>
                <span className="font-bold">{campaignData.used.emails.toLocaleString()}</span>
              </div>
              <Progress value={(campaignData.used.emails / campaignData.limits.emails) * 100} />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Limite</span>
                <span className="text-gray-500">{campaignData.limits.emails.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-green-500" />
              <Badge variant="outline">SMS</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Utilisés</span>
                <span className="font-bold">{campaignData.used.sms.toLocaleString()}</span>
              </div>
              <Progress value={(campaignData.used.sms / campaignData.limits.sms) * 100} />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Limite</span>
                <span className="text-gray-500">{campaignData.limits.sms.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-500" />
              <Badge variant="outline">Leads</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Générés</span>
                <span className="font-bold">{campaignData.used.leads.toLocaleString()}</span>
              </div>
              <Progress value={(campaignData.used.leads / campaignData.limits.leads) * 100} />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Objectif</span>
                <span className="text-gray-500">{campaignData.limits.leads.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-orange-500" />
              <Badge variant="outline">Automations</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Actives</span>
                <span className="font-bold">{campaignData.used.automation}</span>
              </div>
              {typeof campaignData.limits.automation === 'number' && (
                <>
                  <Progress value={(campaignData.used.automation / campaignData.limits.automation) * 100} />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Limite</span>
                    <span className="text-gray-500">{campaignData.limits.automation}</span>
                  </div>
                </>
              )}
              {campaignData.limits.automation === 'unlimited' && (
                <div className="text-center py-2">
                  <Badge className="bg-green-100 text-green-800">Illimité</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campagnes récentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Campagnes récentes</CardTitle>
            <Button onClick={() => setActiveTab('create')} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle campagne
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignData.campaigns.map((campaign) => {
              const TypeIcon = getTypeIcon(campaign.type);
              return (
                <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TypeIcon className={`w-5 h-5 ${getTypeColor(campaign.type)}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-500">{campaign.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status === 'sent' && 'Envoyée'}
                        {campaign.status === 'active' && 'Active'}
                        {campaign.status === 'scheduled' && 'Programmée'}
                        {campaign.status === 'paused' && 'Pausée'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Envoyés</p>
                      <p className="font-bold text-lg">{campaign.sent.toLocaleString()}</p>
                    </div>
                    {campaign.type !== 'lead' && (
                      <div>
                        <p className="text-gray-600">Taux d'ouverture</p>
                        <p className="font-bold text-lg text-blue-600">{campaign.openRate}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">Clics</p>
                      <p className="font-bold text-lg text-green-600">{campaign.clicked}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CTR</p>
                      <p className="font-bold text-lg text-purple-600">{campaign.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-bold text-lg text-orange-600">{campaign.converted}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenus</p>
                      <p className="font-bold text-lg text-red-600">{campaign.revenue}€</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateCampaign = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Créer une nouvelle campagne</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="campaign-name">Nom de la campagne</Label>
            <Input
              id="campaign-name"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              placeholder="Ex: Newsletter Février 2025"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="campaign-type">Type de campagne</Label>
            <select
              id="campaign-type"
              value={newCampaign.type}
              onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">📧 Email Marketing</option>
              <option value="sms">📱 SMS Marketing</option>
              <option value="lead">🎯 Génération de Leads</option>
              <option value="automation">⚡ Automatisation</option>
            </select>
          </div>

          {newCampaign.type === 'email' && (
            <div>
              <Label htmlFor="campaign-subject">Objet de l'email</Label>
              <Input
                id="campaign-subject"
                value={newCampaign.subject}
                onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                placeholder="Ex: 🚀 Nouveautés Techtrust - Ne ratez pas ça !"
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="campaign-content">Contenu de la campagne</Label>
            <Textarea
              id="campaign-content"
              value={newCampaign.content}
              onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
              placeholder={
                newCampaign.type === 'email' 
                  ? "Rédigez votre email ici..."
                  : newCampaign.type === 'sms'
                  ? "Rédigez votre SMS (160 caractères max)..."
                  : newCampaign.type === 'lead'
                  ? "Décrivez votre lead magnet..."
                  : "Décrivez votre séquence d'automatisation..."
              }
              className="mt-1 min-h-32"
            />
          </div>

          <div>
            <Label htmlFor="campaign-target">Audience cible</Label>
            <select
              id="campaign-target"
              value={newCampaign.target}
              onChange={(e) => setNewCampaign({...newCampaign, target: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les contacts</option>
              <option value="active">Contacts actifs</option>
              <option value="new">Nouveaux contacts</option>
              <option value="vip">Clients VIP</option>
              <option value="segment">Segment personnalisé</option>
            </select>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleCreateCampaign}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              disabled={!newCampaign.name || !newCampaign.content}
            >
              <Send className="w-4 h-4 mr-2" />
              Créer et lancer
            </Button>
            <Button
              onClick={() => setActiveTab('overview')}
              variant="outline"
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campagnes Marketing 🚀</h1>
            <p className="text-gray-600">Gérez vos campagnes emails, SMS et automations</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              Plan {userData?.tier?.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Vue d'ensemble
          </Button>
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Créer une campagne
          </Button>
          <Button
            variant={activeTab === 'automation' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('automation')}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Automations
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </Button>
        </div>

        {/* Contenu */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'create' && renderCreateCampaign()}
        {activeTab === 'automation' && (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Automations</h3>
            <p className="text-gray-600 mb-6">Configurez vos séquences d'emails automatisées</p>
            <Button>Créer une automation</Button>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Analytics avancées</h3>
            <p className="text-gray-600 mb-6">Analysez les performances de vos campagnes</p>
            <Button>Voir les statistiques</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
