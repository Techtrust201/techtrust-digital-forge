
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Repeat, Users, DollarSign, Calendar, Play, Pause, X, TrendingUp, AlertTriangle, Crown } from 'lucide-react';

const AdminBillingSubscriptionsPage = () => {
  const subscriptions = [
    {
      id: 'SUB-2024-001',
      clientName: 'Marie Dubois Consulting',
      clientEmail: 'marie@consulting.com',
      plan: 'Agence Web Premium',
      amount: 299,
      billing: 'monthly',
      status: 'active',
      startDate: '2024-01-01',
      nextBilling: '2024-02-01',
      tier: 'gold',
      autoRenew: true,
      paymentMethod: 'Carte bancaire •••• 4242'
    },
    {
      id: 'SUB-2024-002',
      clientName: 'Tech Innovations SARL',
      clientEmail: 'contact@techinnovations.fr',
      plan: 'Growth Hacking Pro',
      amount: 149,
      billing: 'monthly',
      status: 'active',
      startDate: '2024-01-05',
      nextBilling: '2024-02-05',
      tier: 'silver',
      autoRenew: true,
      paymentMethod: 'Prélèvement SEPA'
    },
    {
      id: 'SUB-2024-003',
      clientName: 'StartupCorp',
      clientEmail: 'admin@startupcorp.com',
      plan: 'Community Management Basic',
      amount: 89,
      billing: 'monthly',
      status: 'past_due',
      startDate: '2023-12-15',
      nextBilling: '2024-01-15',
      tier: 'bronze',
      autoRenew: true,
      paymentMethod: 'Carte bancaire •••• 1234'
    },
    {
      id: 'SUB-2024-004',
      clientName: 'Global Services Ltd',
      clientEmail: 'billing@globalservices.com',
      plan: 'Suite Complète Enterprise',
      amount: 499,
      billing: 'monthly',
      status: 'cancelled',
      startDate: '2023-10-01',
      nextBilling: null,
      tier: 'diamond',
      autoRenew: false,
      paymentMethod: 'Virement bancaire'
    },
    {
      id: 'SUB-2024-005',
      clientName: 'Digital Marketing Pro',
      clientEmail: 'contact@digitalmarketing.fr',
      plan: 'Consulting Digital',
      amount: 199,
      billing: 'quarterly',
      status: 'active',
      startDate: '2024-01-10',
      nextBilling: '2024-04-10',
      tier: 'silver',
      autoRenew: true,
      paymentMethod: 'Carte bancaire •••• 5678'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'past_due':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'past_due':
        return 'Impayé';
      case 'cancelled':
        return 'Annulé';
      case 'paused':
        return 'En pause';
      default:
        return status;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'bg-amber-50 text-amber-700';
      case 'silver':
        return 'bg-gray-50 text-gray-700';
      case 'gold':
        return 'bg-yellow-50 text-yellow-700';
      case 'diamond':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getBillingLabel = (billing: string) => {
    switch (billing) {
      case 'monthly':
        return 'Mensuel';
      case 'quarterly':
        return 'Trimestriel';
      case 'yearly':
        return 'Annuel';
      default:
        return billing;
    }
  };

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const totalMRR = activeSubscriptions.reduce((sum, sub) => {
    const monthlyAmount = sub.billing === 'quarterly' ? sub.amount / 3 : sub.amount;
    return sum + monthlyAmount;
  }, 0);
  const pastDueCount = subscriptions.filter(s => s.status === 'past_due').length;
  const churnCount = subscriptions.filter(s => s.status === 'cancelled').length;

  const statsData = [
    { label: 'Abonnements actifs', value: activeSubscriptions.length, icon: Users, color: 'text-green-500' },
    { label: 'MRR (Revenus mensuels)', value: `€${totalMRR.toFixed(2)}`, icon: DollarSign, color: 'text-blue-500' },
    { label: 'Impayés', value: pastDueCount, icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Désabonnements', value: churnCount, icon: X, color: 'text-gray-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Abonnements</h1>
          <p className="text-gray-500 mt-2">Gérer tous les abonnements clients</p>
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

        {/* Liste des abonnements */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les abonnements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Repeat className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{subscription.id}</h3>
                        <p className="text-sm text-gray-600">{subscription.clientName}</p>
                      </div>
                      <Badge className={getStatusColor(subscription.status)}>
                        {getStatusLabel(subscription.status)}
                      </Badge>
                      <Badge variant="outline" className={getTierColor(subscription.tier)}>
                        <Crown className="w-3 h-3 mr-1" />
                        {subscription.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {subscription.status === 'active' && (
                        <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-700">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {subscription.status === 'paused' && (
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{subscription.plan}</h4>
                        <p className="text-sm text-gray-600">{getBillingLabel(subscription.billing)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">€{subscription.amount}</p>
                        <p className="text-sm text-gray-500">/{subscription.billing === 'monthly' ? 'mois' : subscription.billing === 'quarterly' ? 'trimestre' : 'an'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Début:</span>
                      <span className="ml-1 font-medium">{subscription.startDate}</span>
                    </div>
                    {subscription.nextBilling && (
                      <div>
                        <span className="text-gray-500">Prochaine facture:</span>
                        <span className="ml-1 font-medium">{subscription.nextBilling}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Renouvellement auto:</span>
                      <span className={`ml-1 font-medium ${subscription.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                        {subscription.autoRenew ? 'Oui' : 'Non'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Paiement:</span>
                      <span className="ml-1 font-medium text-xs">{subscription.paymentMethod}</span>
                    </div>
                  </div>
                  
                  {subscription.status === 'past_due' && (
                    <div className="bg-red-50 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Paiement en retard</p>
                          <p className="text-xs text-red-600">Le dernier paiement a échoué. Contactez le client ou mettez à jour le moyen de paiement.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {subscription.status === 'cancelled' && (
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <X className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Abonnement annulé</p>
                          <p className="text-xs text-gray-600">L'abonnement a été annulé par le client.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métriques d'abonnement */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Évolution MRR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">MRR Actuel</h4>
                  <p className="text-3xl font-bold text-green-900">€{totalMRR.toFixed(2)}</p>
                  <p className="text-sm text-green-600">+12.5% vs mois dernier</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-600">Nouveaux MRR</p>
                    <p className="text-xl font-bold text-blue-900">€347</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <p className="text-sm text-red-600">MRR perdus</p>
                    <p className="text-xl font-bold text-red-900">€149</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                Répartition par tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['diamond', 'gold', 'silver', 'bronze'].map((tier) => {
                  const count = subscriptions.filter(s => s.tier === tier && s.status === 'active').length;
                  const percentage = activeSubscriptions.length > 0 ? (count / activeSubscriptions.length) * 100 : 0;
                  return (
                    <div key={tier} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Crown className={`w-4 h-4 ${
                          tier === 'diamond' ? 'text-purple-600' :
                          tier === 'gold' ? 'text-yellow-600' :
                          tier === 'silver' ? 'text-gray-600' : 'text-amber-600'
                        }`} />
                        <span className="font-medium capitalize">{tier}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              tier === 'diamond' ? 'bg-purple-500' :
                              tier === 'gold' ? 'bg-yellow-500' :
                              tier === 'silver' ? 'bg-gray-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBillingSubscriptionsPage;
