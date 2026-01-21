
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, TrendingUp, Calendar, CheckCircle, XCircle, Clock, Repeat } from 'lucide-react';

const AdminBillingPaymentsPage = () => {
  const payments = [
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-001',
      clientName: 'Marie Dubois Consulting',
      amount: 2990,
      status: 'completed',
      method: 'Carte bancaire',
      processedDate: '2024-01-12 14:30',
      fees: 87,
      currency: 'EUR',
      transactionId: 'TXN_abc123456'
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-003',
      clientName: 'StartupCorp',
      amount: 590,
      status: 'failed',
      method: 'Prélèvement SEPA',
      processedDate: '2024-01-10 09:15',
      fees: 0,
      currency: 'EUR',
      transactionId: 'TXN_def789012'
    },
    {
      id: 'PAY-2024-003',
      invoiceId: 'INV-2024-002',
      clientName: 'Tech Innovations SARL',
      amount: 1490,
      status: 'pending',
      method: 'Virement bancaire',
      processedDate: null,
      fees: 0,
      currency: 'EUR',
      transactionId: null
    },
    {
      id: 'PAY-2024-004',
      invoiceId: 'INV-2023-125',
      clientName: 'Global Services Ltd',
      amount: 4500,
      status: 'completed',
      method: 'Carte bancaire',
      processedDate: '2024-01-08 16:45',
      fees: 135,
      currency: 'EUR',
      transactionId: 'TXN_ghi345678'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échec';
      case 'refunded':
        return 'Remboursé';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      case 'refunded':
        return Repeat;
      default:
        return Clock;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Carte bancaire':
        return 'bg-blue-50 text-blue-700';
      case 'Prélèvement SEPA':
        return 'bg-green-50 text-green-700';
      case 'Virement bancaire':
        return 'bg-purple-50 text-purple-700';
      case 'PayPal':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const totalAmount = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const totalFees = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.fees, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
  const failedCount = payments.filter(p => p.status === 'failed').length;

  const statsData = [
    { label: 'Paiements reçus', value: `€${(totalAmount / 100).toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Frais totaux', value: `€${(totalFees / 100).toFixed(2)}`, icon: CreditCard, color: 'text-blue-500' },
    { label: 'En attente', value: `€${(pendingAmount / 100).toFixed(2)}`, icon: Clock, color: 'text-yellow-500' },
    { label: 'Paiements échoués', value: failedCount, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
          <p className="text-gray-500 mt-2">Suivi de tous les paiements et transactions</p>
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

        {/* Liste des paiements */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => {
                const StatusIcon = getStatusIcon(payment.status);
                return (
                  <div key={payment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          payment.status === 'completed' ? 'bg-green-100' :
                          payment.status === 'failed' ? 'bg-red-100' :
                          payment.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <StatusIcon className={`w-5 h-5 ${
                            payment.status === 'completed' ? 'text-green-600' :
                            payment.status === 'failed' ? 'text-red-600' :
                            payment.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{payment.id}</h3>
                          <p className="text-sm text-gray-600">{payment.clientName}</p>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusLabel(payment.status)}
                        </Badge>
                        <Badge variant="outline" className={getMethodColor(payment.method)}>
                          {payment.method}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">€{(payment.amount / 100).toFixed(2)}</p>
                        {payment.fees > 0 && (
                          <p className="text-sm text-gray-500">Frais: €{(payment.fees / 100).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Facture:</span>
                        <span className="ml-1 font-medium">{payment.invoiceId}</span>
                      </div>
                      {payment.processedDate && (
                        <div>
                          <span className="text-gray-500">Traité le:</span>
                          <span className="ml-1 font-medium">{payment.processedDate}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Devise:</span>
                        <span className="ml-1 font-medium">{payment.currency}</span>
                      </div>
                      {payment.transactionId && (
                        <div>
                          <span className="text-gray-500">Transaction:</span>
                          <span className="ml-1 font-medium text-xs">{payment.transactionId}</span>
                        </div>
                      )}
                    </div>
                    
                    {payment.status === 'completed' && (
                      <div className="bg-white p-3 rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Net reçu</p>
                            <p className="text-lg font-bold text-green-600">
                              €{((payment.amount - payment.fees) / 100).toFixed(2)}
                            </p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      </div>
                    )}
                    
                    {payment.status === 'failed' && (
                      <div className="bg-red-50 p-3 rounded">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Paiement échoué</p>
                            <p className="text-xs text-red-600">Fonds insuffisants ou carte expirée</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {payment.status === 'pending' && (
                      <div className="bg-yellow-50 p-3 rounded">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">En cours de traitement</p>
                            <p className="text-xs text-yellow-600">Le paiement sera traité sous 1-3 jours ouvrés</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Récapitulatif mensuel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Récapitulatif mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Janvier 2024</h4>
                <p className="text-2xl font-bold text-green-900">€{(totalAmount / 100).toFixed(2)}</p>
                <p className="text-sm text-green-600">Revenus nets</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Frais de transaction</h4>
                <p className="text-2xl font-bold text-blue-900">€{(totalFees / 100).toFixed(2)}</p>
                <p className="text-sm text-blue-600">{((totalFees / totalAmount) * 100).toFixed(1)}% du total</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Taux de réussite</h4>
                <p className="text-2xl font-bold text-purple-900">
                  {Math.round(((payments.length - failedCount) / payments.length) * 100)}%
                </p>
                <p className="text-sm text-purple-600">{payments.length - failedCount}/{payments.length} paiements réussis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBillingPaymentsPage;
