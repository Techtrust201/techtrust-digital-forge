"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Download,
  Calendar,
  Check,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function BillingPage() {
  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/24', default: false }
  ];

  const invoices = [
    { id: 'INV-2024-001', date: '15 Jan 2024', amount: '€99.00', status: 'Payée' },
    { id: 'INV-2023-012', date: '15 Déc 2023', amount: '€99.00', status: 'Payée' },
    { id: 'INV-2023-011', date: '15 Nov 2023', amount: '€99.00', status: 'Payée' },
    { id: 'INV-2023-010', date: '15 Oct 2023', amount: '€99.00', status: 'Payée' },
    { id: 'INV-2023-009', date: '15 Sep 2023', amount: '€99.00', status: 'Payée' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-blue-500" />
            Facturation
          </h1>
          <p className="text-gray-600">Gérez vos moyens de paiement et consultez vos factures</p>
        </div>

        {/* Résumé */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">€99</div>
              <div className="text-sm text-gray-600">Prochain paiement</div>
              <Badge className="mt-2 bg-blue-100 text-blue-800">15 Fév 2024</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">€1,188</div>
              <div className="text-sm text-gray-600">Total payé (12 mois)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">Gold</div>
              <div className="text-sm text-gray-600">Plan actuel</div>
            </CardContent>
          </Card>
        </div>

        {/* Moyens de paiement */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Moyens de Paiement</CardTitle>
                <CardDescription>Gérez vos cartes de paiement</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter carte
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {method.type} •••• {method.last4}
                      </div>
                      <div className="text-sm text-gray-600">Expire {method.expiry}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {method.default && (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Par défaut
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">Modifier</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Historique des factures */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Factures</CardTitle>
            <CardDescription>Téléchargez vos factures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-600">{invoice.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{invoice.amount}</div>
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informations de facturation */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de Facturation</CardTitle>
            <CardDescription>Adresse utilisée pour vos factures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">Techtrust SAS</p>
                <p className="text-gray-600">123 Avenue des Champs-Élysées</p>
                <p className="text-gray-600">75008 Paris, France</p>
                <p className="text-gray-600">TVA: FR12345678901</p>
              </div>
              <Button variant="outline">Modifier</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
