
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Send, 
  Users, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Plus,
  Smartphone,
  Clock,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SMSCampaigns = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  // Données simulées pour SMS
  const smsData = [
    { name: 'Lun', envois: 450, delivres: 442, clics: 38 },
    { name: 'Mar', envois: 520, delivres: 511, clics: 47 },
    { name: 'Mer', envois: 380, delivres: 374, clics: 34 },
    { name: 'Jeu', envois: 670, delivres: 658, clics: 59 },
    { name: 'Ven', envois: 840, delivres: 825, clics: 76 },
    { name: 'Sam', envois: 920, delivres: 903, clics: 88 },
    { name: 'Dim', envois: 730, delivres: 717, clics: 65 }
  ];

  const smsCampaignsData = [
    {
      id: 1,
      name: 'Promotion Flash 24h',
      status: 'Envoyé',
      sent: 1500,
      delivered: 1478,
      clicked: 142,
      deliveryRate: 98.5,
      clickRate: 9.6,
      date: '16 Jan 2024',
      cost: 75
    },
    {
      id: 2,
      name: 'Rappel RDV Client',
      status: 'Planifié',
      sent: 0,
      delivered: 0,
      clicked: 0,
      deliveryRate: 0,
      clickRate: 0,
      date: '20 Jan 2024',
      cost: 25
    },
    {
      id: 3,
      name: 'Nouveau Service Launch',
      status: 'En cours',
      sent: 800,
      delivered: 784,
      clicked: 67,
      deliveryRate: 98,
      clickRate: 8.4,
      date: '15 Jan 2024',
      cost: 40
    }
  ];

  const smsTemplatesData = [
    { id: 1, name: 'Promotion Flash', category: 'Marketing', length: 145, usage: 23 },
    { id: 2, name: 'Rappel RDV', category: 'Service', length: 89, usage: 156 },
    { id: 3, name: 'Code Promo', category: 'Marketing', length: 92, usage: 67 },
    { id: 4, name: 'Confirmation Commande', category: 'Transaction', length: 134, usage: 203 }
  ];

  const quickStats = [
    {
      title: 'Taux de livraison',
      value: '98.2%',
      change: '+0.3%',
      positive: true,
      icon: Smartphone
    },
    {
      title: 'Taux de clic',
      value: '8.7%',
      change: '+1.2%',
      positive: true,
      icon: MousePointer
    },
    {
      title: 'Contacts SMS',
      value: '8,430',
      change: '+156',
      positive: true,
      icon: Users
    },
    {
      title: 'Coût moyen',
      value: '€0.05',
      change: '-€0.01',
      positive: true,
      icon: DollarSign
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Envoyé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Planifié': return 'bg-yellow-100 text-yellow-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
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
              <MessageSquare className="w-8 h-8 text-green-500" />
              SMS Marketing
            </h1>
            <p className="text-gray-600">
              Gérez vos campagnes SMS efficacement
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">
              <Smartphone className="w-3 h-3 mr-1" />
              98.2% livraison
            </Badge>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau SMS
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
                    <StatIcon className="w-8 h-8 text-green-500" />
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
              onClick={() => setActiveTab('campaigns')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Campagnes SMS
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'campaigns' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Campagnes SMS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {smsCampaignsData.map((campaign) => (
                      <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-green-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                              <p className="text-sm text-gray-600">{campaign.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Envoyés</div>
                            <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Livrés</div>
                            <div className="font-medium">{campaign.delivered.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Taux livraison</div>
                            <div className="font-medium">{campaign.deliveryRate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Taux clic</div>
                            <div className="font-medium">{campaign.clickRate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Coût</div>
                            <div className="font-medium">€{campaign.cost}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-1" />
                            Dupliquer
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                          {campaign.status === 'Planifié' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              <Send className="w-4 h-4 mr-1" />
                              Envoyer maintenant
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
                      Créer campagne
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Gérer contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planifier envoi
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Optimisation IA</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Meilleur moment pour envoyer : 14h-16h
                  </p>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    Planifier maintenant
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Limite SMS</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilisés ce mois</span>
                      <span>2,340 / 5,000</span>
                    </div>
                    <Progress value={47} />
                    <p className="text-xs text-gray-600">
                      2,660 SMS restants ce mois
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <Card>
            <CardHeader>
              <CardTitle>Templates SMS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {smsTemplatesData.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                        <Badge variant="outline" className="mb-2">{template.category}</Badge>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{template.length}/160 car.</div>
                        <div>{template.usage} utilisations</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded text-sm mb-3 min-h-[80px]">
                      <p className="text-gray-700">
                        {template.name === 'Promotion Flash' && '🎉 FLASH SALE ! 50% de réduction sur tous nos services pendant 24h. Code: FLASH50. Commandez maintenant: bit.ly/flash50'}
                        {template.name === 'Rappel RDV' && 'Bonjour {nom}, rappel de votre RDV demain à {heure} avec {conseiller}. Confirmez par SMS.'}
                        {template.name === 'Code Promo' && 'Votre code promo: {code}. Valable jusqu\'au {date}. Économisez {montant}€ !'}
                        {template.name === 'Confirmation Commande' && 'Commande #{numero} confirmée ! Livraison prévue le {date}. Suivi: {lien}'}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                      <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
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
                <CardTitle>Performance SMS</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={smsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="envois" stroke="#10B981" strokeWidth={2} name="Envois" />
                    <Line type="monotone" dataKey="delivres" stroke="#3B82F6" strokeWidth={2} name="Livrés" />
                    <Line type="monotone" dataKey="clics" stroke="#8B5CF6" strokeWidth={2} name="Clics" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparaison par Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={smsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clics" fill="#10B981" name="Clics" />
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

export default SMSCampaigns;
