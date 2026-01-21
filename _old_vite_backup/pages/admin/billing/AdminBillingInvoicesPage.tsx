
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Download, Eye, Send, DollarSign, Calendar, User, CreditCard } from 'lucide-react';

const AdminBillingInvoicesPage = () => {
  const invoices = [
    {
      id: 'INV-2024-001',
      clientName: 'Marie Dubois Consulting',
      clientEmail: 'marie@consulting.com',
      amount: 2990,
      status: 'paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-12',
      createdDate: '2024-01-01',
      services: ['Agence Web Premium', 'Growth Hacking'],
      paymentMethod: 'Carte bancaire'
    },
    {
      id: 'INV-2024-002',
      clientName: 'Tech Innovations SARL',
      clientEmail: 'contact@techinnovations.fr',
      amount: 1490,
      status: 'pending',
      dueDate: '2024-01-20',
      paidDate: null,
      createdDate: '2024-01-05',
      services: ['Consulting Digital', 'Community Management'],
      paymentMethod: null
    },
    {
      id: 'INV-2024-003',
      clientName: 'StartupCorp',
      clientEmail: 'admin@startupcorp.com',
      amount: 590,
      status: 'overdue',
      dueDate: '2024-01-10',
      paidDate: null,
      createdDate: '2023-12-28',
      services: ['Growth Hacking Basic'],
      paymentMethod: null
    },
    {
      id: 'INV-2024-004',
      clientName: 'E-Commerce Plus',
      clientEmail: 'billing@ecommerceplus.fr',
      amount: 3990,
      status: 'draft',
      dueDate: '2024-01-25',
      paidDate: null,
      createdDate: '2024-01-14',
      services: ['Agence Web Premium', 'Consulting Digital', 'Growth Hacking'],
      paymentMethod: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'overdue':
        return 'En retard';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

  const statsData = [
    { label: 'Total factures', value: invoices.length, icon: FileText, color: 'text-blue-500' },
    { label: 'Montant payé', value: `€${(paidAmount / 100).toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'En attente', value: `€${(pendingAmount / 100).toFixed(2)}`, icon: Calendar, color: 'text-yellow-500' },
    { label: 'En retard', value: `€${(overdueAmount / 100).toFixed(2)}`, icon: CreditCard, color: 'text-red-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Factures</h1>
            <p className="text-gray-500 mt-2">Gérer toutes les factures clients</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle facture
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

        {/* Liste des factures */}
        <Card>
          <CardHeader>
            <CardTitle>Toutes les factures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.clientName}</p>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {invoice.status === 'pending' && (
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Montant:</span>
                      <span className="ml-1 font-bold text-lg">€{(invoice.amount / 100).toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Échéance:</span>
                      <span className="ml-1 font-medium">{invoice.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Créée le:</span>
                      <span className="ml-1 font-medium">{invoice.createdDate}</span>
                    </div>
                    {invoice.paidDate && (
                      <div>
                        <span className="text-gray-500">Payée le:</span>
                        <span className="ml-1 font-medium text-green-600">{invoice.paidDate}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Services facturés:</p>
                    <div className="flex flex-wrap gap-2">
                      {invoice.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{invoice.clientEmail}</span>
                      </div>
                      {invoice.paymentMethod && (
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{invoice.paymentMethod}</span>
                        </div>
                      )}
                    </div>
                    {invoice.status === 'overdue' && (
                      <Badge variant="destructive" className="text-xs">
                        Retard de {Math.ceil((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 3600 * 24))} jours
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


    </AdminLayout>
  );
};

export default AdminBillingInvoicesPage;
