import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Zap, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Play,
  Pause,
  Mail,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Send,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const AdminCampaignsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for campaigns
  const mockCampaigns = [
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
      conversionRate: 0.9,
      budget: '2,500€',
      created: '2025-01-15'
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
      conversionRate: 5.3,
      budget: '1,200€',
      created: '2025-01-12'
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
      conversionRate: 75.1,
      budget: '800€',
      created: '2025-01-10'
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
      conversionRate: 7.1,
      budget: '500€',
      created: '2025-01-08'
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
      conversionRate: 0,
      budget: '1,000€',
      created: '2025-01-20'
    }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/email')) return 'Campagnes Email';
    if (path.includes('/sms')) return 'Campagnes SMS';
    if (path.includes('/automation')) return 'Automatisation';
    return 'Toutes les Campagnes';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/email')) return 'Gérez vos campagnes d\'email marketing';
    if (path.includes('/sms')) return 'Créez et gérez vos campagnes SMS';
    if (path.includes('/automation')) return 'Configurez vos séquences automatisées';
    return 'Gérez vos campagnes marketing et leur performance';
  };

  const getFilteredCampaigns = () => {
    const path = location.pathname;
    
    if (path.includes('/email')) {
      return mockCampaigns.filter(campaign => campaign.type === 'email');
    }
    
    if (path.includes('/sms')) {
      return mockCampaigns.filter(campaign => campaign.type === 'sms');
    }
    
    if (path.includes('/automation')) {
      return mockCampaigns.filter(campaign => campaign.type === 'automation');
    }
    
    // Toutes les campagnes
    return mockCampaigns;
  };

  const campaigns = getFilteredCampaigns();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'sent': return 'Envoyée';
      case 'completed': return 'Terminée';
      case 'draft': return 'Brouillon';
      case 'scheduled': return 'Programmée';
      case 'paused': return 'En pause';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'lead': return Target;
      case 'automation': return Settings;
      default: return Zap;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-purple-100 text-purple-800';
      case 'automation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  // Page Automatisation
  if (location.pathname.includes('/automation')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle automatisation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Automatisations Actives</CardTitle>
                <Settings className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-600">+2 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Automatiques</CardTitle>
                <Send className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,230</div>
                <p className="text-xs text-gray-600">Ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15.8%</div>
                <p className="text-xs text-gray-600">+3.2% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temps Économisé</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48h</div>
                <p className="text-xs text-gray-600">Cette semaine</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer une séquence</CardTitle>
                <CardDescription>Configurez une nouvelle automatisation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Séquence Email
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Séquence SMS
                </Button>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Séquence Mixte
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates populaires</CardTitle>
                <CardDescription>Utilisez nos modèles prêts à l'emploi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="font-medium">Séquence de bienvenue</div>
                  <div className="text-sm text-gray-500">3 emails sur 7 jours</div>
                </div>
                <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="font-medium">Abandon de panier</div>
                  <div className="text-sm text-gray-500">2 emails + 1 SMS</div>
                </div>
                <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="font-medium">Réactivation</div>
                  <div className="text-sm text-gray-500">4 emails sur 14 jours</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance globale</CardTitle>
                <CardDescription>Résultats de vos automatisations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taux d'ouverture</span>
                  <span className="font-bold">72.5%</span>
                </div>
                <Progress value={72.5} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taux de clic</span>
                  <span className="font-bold">18.3%</span>
                </div>
                <Progress value={18.3} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conversion</span>
                  <span className="font-bold">15.8%</span>
                </div>
                <Progress value={15.8} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campagnes marketing</CardTitle>
                  <CardDescription>Suivez et gérez toutes vos campagnes</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher une campagne..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campagne</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Envoyés</TableHead>
                    <TableHead>Taux d'ouverture</TableHead>
                    <TableHead>Taux de clic</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.created}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(campaign.type)}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {campaign.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {getStatusText(campaign.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={campaign.openRate} className="w-16" />
                            <span className="text-sm">{campaign.openRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={campaign.ctr} className="w-16" />
                            <span className="text-sm">{campaign.ctr}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.budget}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Statistiques
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <DropdownMenuItem>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Mettre en pause
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="w-4 h-4 mr-2" />
                                  Démarrer
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance par canal</CardTitle>
                <CardDescription>Comparaison des canaux marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Email Marketing</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">24.8%</div>
                      <div className="text-sm text-gray-500">Taux d'ouverture</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="font-medium">SMS Marketing</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">89.2%</div>
                      <div className="text-sm text-gray-500">Taux d'ouverture</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">Social Media</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">12.4%</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Dernières actions sur vos campagnes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Campagne lancée</div>
                      <div className="text-xs text-gray-500">Newsletter Janvier - il y a 2h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Rapport généré</div>
                      <div className="text-xs text-gray-500">Performance Q4 2023 - il y a 4h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Campagne en attente</div>
                      <div className="text-xs text-gray-500">Webinar Growth - il y a 1j</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Pages spécifiques Email ou SMS
  if (location.pathname.includes('/email') || location.pathname.includes('/sms')) {
    const isEmail = location.pathname.includes('/email');
    
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              {isEmail ? 'Nouvel email' : 'Nouveau SMS'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEmail ? 'Emails Envoyés' : 'SMS Envoyés'}
                </CardTitle>
                {isEmail ? <Mail className="h-4 w-4 text-blue-600" /> : <MessageSquare className="h-4 w-4 text-green-600" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isEmail ? '15.4K' : '8.9K'}</div>
                <p className="text-xs text-gray-600">Ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux d'Ouverture</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isEmail ? '58%' : '98%'}</div>
                <p className="text-xs text-gray-600">Moyenne</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de Clic</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isEmail ? '8.1%' : '24.5%'}</div>
                <p className="text-xs text-gray-600">Moyenne</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isEmail ? '1,247' : '2,147'}</div>
                <p className="text-xs text-gray-600">Ce mois</p>
              </CardContent>
            </Card>
          </div>

          {isEmail && (
            <Card>
              <CardHeader>
                <CardTitle>Créer un email</CardTitle>
                <CardDescription>Concevez votre prochaine campagne email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom de la campagne</label>
                    <Input placeholder="Newsletter Février 2024" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Liste de destinataires</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Tous les abonnés</option>
                      <option>Clients Premium</option>
                      <option>Prospects</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Objet</label>
                  <Input placeholder="Découvrez nos nouveautés de février !" />
                </div>
                <div>
                  <label className="text-sm font-medium">Contenu</label>
                  <Textarea placeholder="Contenu de votre email..." rows={6} />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-red-500 hover:bg-red-600">Envoyer maintenant</Button>
                  <Button variant="outline">Programmer</Button>
                  <Button variant="outline">Aperçu</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!isEmail && (
            <Card>
              <CardHeader>
                <CardTitle>Créer un SMS</CardTitle>
                <CardDescription>Rédigez votre message SMS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom de la campagne</label>
                    <Input placeholder="Promo weekend SMS" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Liste de destinataires</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Tous les contacts</option>
                      <option>Clients VIP</option>
                      <option>Clients locaux</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Message (160 caractères max)</label>
                  <Textarea 
                    placeholder="🎉 PROMO FLASH : -30% sur tout le site avec le code WEEKEND30. Valable jusqu'à dimanche minuit ! shop.com/promo"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">160 caractères restants</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-red-500 hover:bg-red-600">Envoyer maintenant</Button>
                  <Button variant="outline">Programmer</Button>
                  <Button variant="outline">Test</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campagnes marketing</CardTitle>
                  <CardDescription>Suivez et gérez toutes vos campagnes</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher une campagne..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campagne</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Envoyés</TableHead>
                    <TableHead>Taux d'ouverture</TableHead>
                    <TableHead>Taux de clic</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.created}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(campaign.type)}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {campaign.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {getStatusText(campaign.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={campaign.openRate} className="w-16" />
                            <span className="text-sm">{campaign.openRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={campaign.ctr} className="w-16" />
                            <span className="text-sm">{campaign.ctr}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.budget}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Statistiques
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <DropdownMenuItem>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Mettre en pause
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="w-4 h-4 mr-2" />
                                  Démarrer
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance par canal</CardTitle>
                <CardDescription>Comparaison des canaux marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Email Marketing</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">24.8%</div>
                      <div className="text-sm text-gray-500">Taux d'ouverture</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="font-medium">SMS Marketing</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">89.2%</div>
                      <div className="text-sm text-gray-500">Taux d'ouverture</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">Social Media</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">12.4%</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Dernières actions sur vos campagnes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Campagne lancée</div>
                      <div className="text-xs text-gray-500">Newsletter Janvier - il y a 2h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Rapport généré</div>
                      <div className="text-xs text-gray-500">Performance Q4 2023 - il y a 4h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Campagne en attente</div>
                      <div className="text-xs text-gray-500">Webinar Growth - il y a 1j</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Page principale
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 mt-2">Gérez vos campagnes marketing et leur performance</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-gray-600">+5 cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Envoyés</CardTitle>
              <Mail className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125K</div>
              <p className="text-xs text-gray-600">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'Ouverture</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8%</div>
              <p className="text-xs text-gray-600">+2.1% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,247</div>
              <p className="text-xs text-gray-600">+8.5% cette semaine</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campagnes marketing</CardTitle>
                <CardDescription>Suivez et gérez toutes vos campagnes</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher une campagne..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campagne</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Envoyés</TableHead>
                  <TableHead>Taux d'ouverture</TableHead>
                  <TableHead>Taux de clic</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCampaigns.map((campaign) => {
                  const TypeIcon = getTypeIcon(campaign.type);
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.created}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(campaign.type)}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {campaign.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusText(campaign.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={campaign.openRate} className="w-16" />
                          <span className="text-sm">{campaign.openRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={campaign.ctr} className="w-16" />
                          <span className="text-sm">{campaign.ctr}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.budget}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Statistiques
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            {campaign.status === 'active' ? (
                              <DropdownMenuItem>
                                <Pause className="w-4 h-4 mr-2" />
                                Mettre en pause
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Play className="w-4 h-4 mr-2" />
                                Démarrer
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance par canal</CardTitle>
              <CardDescription>Comparaison des canaux marketing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Email Marketing</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">24.8%</div>
                    <div className="text-sm text-gray-500">Taux d'ouverture</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span className="font-medium">SMS Marketing</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">89.2%</div>
                    <div className="text-sm text-gray-500">Taux d'ouverture</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Social Media</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">12.4%</div>
                    <div className="text-sm text-gray-500">Engagement</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur vos campagnes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Campagne lancée</div>
                    <div className="text-xs text-gray-500">Newsletter Janvier - il y a 2h</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Rapport généré</div>
                    <div className="text-xs text-gray-500">Performance Q4 2023 - il y a 4h</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Campagne en attente</div>
                    <div className="text-xs text-gray-500">Webinar Growth - il y a 1j</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaignsPage;
