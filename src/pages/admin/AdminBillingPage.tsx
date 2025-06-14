import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Banknote,
  UserCheck
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

const AdminBillingPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for invoices
  const mockInvoices = [
    {
      id: 'INV-2024-001',
      customer: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      amount: 2500,
      status: 'paid',
      plan: 'Gold',
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      created: '2024-01-01'
    },
    {
      id: 'INV-2024-002',
      customer: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      amount: 1200,
      status: 'pending',
      plan: 'Silver',
      dueDate: '2024-01-20',
      paidDate: null,
      created: '2024-01-05'
    },
    {
      id: 'INV-2024-003',
      customer: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      amount: 800,
      status: 'overdue',
      plan: 'Bronze',
      dueDate: '2024-01-10',
      paidDate: null,
      created: '2023-12-28'
    }
  ];

  // Mock data for subscriptions
  const mockSubscriptions = [
    {
      id: 1,
      customer: 'Marie Dubois',
      plan: 'Gold',
      price: 299,
      status: 'active',
      nextBilling: '2024-02-15',
      created: '2023-02-15'
    },
    {
      id: 2,
      customer: 'Pierre Martin',
      plan: 'Silver',
      price: 149,
      status: 'active',
      nextBilling: '2024-02-05',
      created: '2023-05-05'
    },
    {
      id: 3,
      customer: 'Sophie Laurent',
      plan: 'Bronze',
      price: 79,
      status: 'cancelled',
      nextBilling: null,
      created: '2023-08-12'
    }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/invoices')) return 'Factures';
    if (path.includes('/payments')) return 'Paiements';
    if (path.includes('/subscriptions')) return 'Abonnements';
    return 'Facturation';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path.includes('/invoices')) return 'Gérez toutes les factures émises';
    if (path.includes('/payments')) return 'Suivez tous les paiements reçus';
    if (path.includes('/subscriptions')) return 'Gérez les abonnements clients';
    return 'Gérez la facturation et les paiements';
  };

  const getFilteredData = () => {
    const path = location.pathname;
    
    if (path.includes('/invoices')) {
      return {
        type: 'invoices',
        data: mockInvoices
      };
    }
    
    if (path.includes('/payments')) {
      return {
        type: 'payments',
        data: [
          {
            id: 'PAY-2024-001',
            customer: 'Marie Dubois',
            amount: 2500,
            method: 'card',
            status: 'completed',
            invoice: 'INV-2024-001',
            processed: '2024-01-14 15:30',
            fee: 75
          },
          {
            id: 'PAY-2024-002',
            customer: 'Jean Dupont',
            amount: 1500,
            method: 'bank_transfer',
            status: 'completed',
            invoice: 'INV-2024-004',
            processed: '2024-01-12 09:15',
            fee: 10
          },
          {
            id: 'PAY-2024-003',
            customer: 'Sophie Martin',
            amount: 900,
            method: 'card',
            status: 'failed',
            invoice: 'INV-2024-005',
            processed: '2024-01-10 14:22',
            fee: 0
          }
        ]
      };
    }
    
    if (path.includes('/subscriptions')) {
      return {
        type: 'subscriptions',
        data: mockSubscriptions
      };
    }
    
    return { type: 'invoices', data: mockInvoices };
  };

  const { type, data } = getFilteredData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'pending': return 'En attente';
      case 'overdue': return 'En retard';
      case 'active': return 'Actif';
      case 'cancelled': return 'Annulé';
      case 'paused': return 'En pause';
      case 'completed': return 'Terminé';
      case 'failed': return 'Échec';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'active':
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'overdue':
      case 'failed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'card': return 'Carte bancaire';
      case 'bank_transfer': return 'Virement';
      case 'paypal': return 'PayPal';
      default: return method;
    }
  };

  // Page Factures
  if (location.pathname.includes('/invoices')) {
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
              Nouvelle facture
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Factures ce mois</CardTitle>
                <Receipt className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">+12 vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-gray-600">18,750€ en attente</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En retard</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-600">4,200€ en retard</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payées</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-gray-600">95.2% de taux de paiement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Factures récentes</CardTitle>
                  <CardDescription>Gérez toutes les factures et paiements</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher une facture..."
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
                    <TableHead>Facture</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => {
                    const StatusIcon = getStatusIcon(invoice.status);
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="font-medium">{invoice.id}</div>
                          <div className="text-sm text-gray-500">{invoice.created}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{invoice.customer}</div>
                          <div className="text-sm text-gray-500">{invoice.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPlanColor(invoice.plan)}>
                            {invoice.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{invoice.amount}€</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusText(invoice.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger PDF
                              </DropdownMenuItem>
                              {invoice.status === 'pending' && (
                                <DropdownMenuItem>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Marquer comme payée
                                </DropdownMenuItem>
                              )}
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
        </div>
      </AdminLayout>
    );
  }

  // Page Paiements
  if (location.pathname.includes('/payments')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements reçus</CardTitle>
                <Banknote className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231€</div>
                <p className="text-xs text-gray-600">Ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Frais totaux</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234€</div>
                <p className="text-xs text-gray-600">2.7% du total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97.8%</div>
                <p className="text-xs text-gray-600">+0.5% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements échoués</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-600">2.2% du total</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historique des paiements</CardTitle>
                  <CardDescription>Tous les paiements reçus</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Rechercher un paiement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
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
                    <TableHead>ID Paiement</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Frais</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((payment: any) => {
                    const StatusIcon = getStatusIcon(payment.status);
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell className="font-medium">{payment.amount}€</TableCell>
                        <TableCell>{getMethodText(payment.method)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusText(payment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.fee}€</TableCell>
                        <TableCell>{payment.processed}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger reçu
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
        </div>
      </AdminLayout>
    );
  }

  // Page Abonnements
  if (location.pathname.includes('/subscriptions')) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-500 mt-2">{getPageDescription()}</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <UserCheck className="w-4 h-4 mr-2" />
              Nouveau client
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Abonnements actifs</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847</div>
                <p className="text-xs text-gray-600">+24 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">126,450€</div>
                <p className="text-xs text-gray-600">Récurrents</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-gray-600">-0.3% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">LTV Moyenne</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,420€</div>
                <p className="text-xs text-gray-600">Par client</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par plan</CardTitle>
                <CardDescription>Distribution des abonnements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
                  <span className="font-bold">234 clients</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
                  <span className="font-bold">398 clients</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-100 text-orange-800">Bronze</Badge>
                  <span className="font-bold">215 clients</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaines facturations</CardTitle>
                <CardDescription>À venir dans les 7 jours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Aujourd'hui</span>
                  <span className="font-bold">23 clients - 4,567€</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Demain</span>
                  <span className="font-bold">31 clients - 6,789€</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Dans 2 jours</span>
                  <span className="font-bold">19 clients - 3,234€</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Gestion des abonnements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Voir les annulations
                </Button>
                <Button className="w-full" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Échecs de paiement
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Rapport mensuel
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Abonnements</CardTitle>
              <CardDescription>Gestion des abonnements clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Prix mensuel</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Prochaine facturation</TableHead>
                    <TableHead>Depuis</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscriptions.map((subscription) => {
                    const StatusIcon = getStatusIcon(subscription.status);
                    return (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.customer}</TableCell>
                        <TableCell>
                          <Badge className={getPlanColor(subscription.plan)}>
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{subscription.price}€</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(subscription.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusText(subscription.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.nextBilling || '-'}</TableCell>
                        <TableCell>{subscription.created}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Modifier le plan
                              </DropdownMenuItem>
                              {subscription.status === 'active' && (
                                <DropdownMenuItem className="text-red-600">
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  Annuler l'abonnement
                                </DropdownMenuItem>
                              )}
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
            <p className="text-gray-500 mt-2">Gérez la facturation et les paiements</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle facture
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231€</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-gray-600">18,750€ en attente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnements actifs</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-gray-600">+24 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de paiement</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-gray-600">+1.2% ce mois</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Factures récentes</CardTitle>
            <CardDescription>Gérez toutes les factures et paiements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facture</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => {
                  const StatusIcon = getStatusIcon(invoice.status);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="font-medium">{invoice.id}</div>
                        <div className="text-sm text-gray-500">{invoice.created}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{invoice.customer}</div>
                        <div className="text-sm text-gray-500">{invoice.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(invoice.plan)}>
                          {invoice.plan}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{invoice.amount}€</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(invoice.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger PDF
                            </DropdownMenuItem>
                            {invoice.status === 'pending' && (
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Marquer comme payée
                              </DropdownMenuItem>
                            )}
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

        <Card>
          <CardHeader>
            <CardTitle>Abonnements</CardTitle>
            <CardDescription>Gestion des abonnements clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Prix mensuel</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prochaine facturation</TableHead>
                  <TableHead>Depuis</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSubscriptions.map((subscription) => {
                  const StatusIcon = getStatusIcon(subscription.status);
                  return (
                    <TableRow key={subscription.id}>
                      <TableCell className="font-medium">{subscription.customer}</TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(subscription.plan)}>
                          {subscription.plan}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{subscription.price}€</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(subscription.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(subscription.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{subscription.nextBilling || '-'}</TableCell>
                      <TableCell>{subscription.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Modifier le plan
                            </DropdownMenuItem>
                            {subscription.status === 'active' && (
                              <DropdownMenuItem className="text-red-600">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Annuler l'abonnement
                              </DropdownMenuItem>
                            )}
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
      </div>
    </AdminLayout>
  );
};

export default AdminBillingPage;
