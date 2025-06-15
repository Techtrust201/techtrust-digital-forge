
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Users,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Send,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useBillingActions } from '@/hooks/useBillingActions';

const AdminBillingPage = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const { createInvoice, generatePDF, processPayment, updateSubscription, cancelSubscription, isLoading } = useBillingActions();

  // Données mockées
  const invoices = [
    { id: 'INV-001', client: 'Marie Dubois', email: 'marie@email.com', amount: 299, status: 'paid', date: '2025-01-15', dueDate: '2025-02-15' },
    { id: 'INV-002', client: 'Jean Martin', email: 'jean@email.com', amount: 599, status: 'pending', date: '2025-01-14', dueDate: '2025-02-14' },
    { id: 'INV-003', client: 'Sophie Chen', email: 'sophie@email.com', amount: 899, status: 'overdue', date: '2024-12-15', dueDate: '2025-01-15' }
  ];

  const subscriptions = [
    { id: 'SUB-001', client: 'Marie Dubois', plan: 'Premium', amount: 29.99, status: 'active', nextBilling: '2025-02-15' },
    { id: 'SUB-002', client: 'Jean Martin', plan: 'Starter', amount: 9.99, status: 'active', nextBilling: '2025-02-10' },
    { id: 'SUB-003', client: 'Sophie Chen', plan: 'Enterprise', amount: 99.99, status: 'cancelled', nextBilling: null }
  ];

  const payments = [
    { id: 'PAY-001', invoice: 'INV-001', amount: 299, method: 'Stripe', status: 'completed', date: '2025-01-16' },
    { id: 'PAY-002', invoice: 'INV-004', amount: 199, method: 'PayPal', status: 'completed', date: '2025-01-15' },
    { id: 'PAY-003', invoice: 'INV-002', amount: 599, method: 'Virement', status: 'pending', date: '2025-01-14' }
  ];

  const handleCreateInvoice = async () => {
    if (!newInvoice.clientName || !newInvoice.amount) return;
    
    await createInvoice({
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      amount: parseFloat(newInvoice.amount),
      description: newInvoice.description,
      dueDate: newInvoice.dueDate
    });
    
    setNewInvoice({ clientName: '', clientEmail: '', amount: '', description: '', dueDate: '' });
    setShowInvoiceModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderInvoices = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Rechercher une facture..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>
        <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <FileText className="w-4 h-4 mr-2" />
              Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle facture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom du client"
                value={newInvoice.clientName}
                onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})}
              />
              <Input
                placeholder="Email du client"
                type="email"
                value={newInvoice.clientEmail}
                onChange={(e) => setNewInvoice({...newInvoice, clientEmail: e.target.value})}
              />
              <Input
                placeholder="Montant (€)"
                type="number"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
              />
              <Textarea
                placeholder="Description des services"
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
              />
              <Input
                placeholder="Date d'échéance"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
              />
              <Button onClick={handleCreateInvoice} disabled={isLoading}>
                Créer la facture
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{invoice.client}</div>
                  <div className="text-sm text-gray-500">{invoice.email}</div>
                </div>
              </TableCell>
              <TableCell>{invoice.amount}€</TableCell>
              <TableCell>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status === 'paid' ? 'Payée' : invoice.status === 'pending' ? 'En attente' : 'En retard'}
                </Badge>
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Voir facture', invoice.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => generatePDF(invoice.id)}>
                      <Download className="w-4 h-4 mr-2" />
                      Générer PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Envoyer', invoice.id)}>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer par email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Abonnements clients</h3>
        <Button className="bg-red-500 hover:bg-red-600">
          <Users className="w-4 h-4 mr-2" />
          Nouveau plan
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Prochaine facturation</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium">{subscription.id}</TableCell>
              <TableCell>{subscription.client}</TableCell>
              <TableCell>
                <Badge variant="outline">{subscription.plan}</Badge>
              </TableCell>
              <TableCell>{subscription.amount}€/mois</TableCell>
              <TableCell>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status === 'active' ? 'Actif' : 'Annulé'}
                </Badge>
              </TableCell>
              <TableCell>{subscription.nextBilling || 'N/A'}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Modifier', subscription.id)}>
                      Modifier le plan
                    </DropdownMenuItem>
                    {subscription.status === 'active' && (
                      <DropdownMenuItem 
                        onClick={() => cancelSubscription(subscription.id)}
                        className="text-red-600"
                      >
                        Annuler l'abonnement
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Historique des paiements</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Facture</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Méthode</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.invoice}</TableCell>
              <TableCell>{payment.amount}€</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status === 'completed' ? 'Terminé' : 'En attente'}
                </Badge>
              </TableCell>
              <TableCell>{payment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
          <p className="text-gray-500 mt-2">Gérez vos factures, abonnements et paiements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450€</div>
              <p className="text-xs text-muted-foreground">+15% vs mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Total: 4,780€</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnements actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 ce mois</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation tabs */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'invoices', label: 'Factures' },
              { id: 'subscriptions', label: 'Abonnements' },
              { id: 'payments', label: 'Paiements' }
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
          {activeTab === 'invoices' && renderInvoices()}
          {activeTab === 'subscriptions' && renderSubscriptions()}
          {activeTab === 'payments' && renderPayments()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBillingPage;
