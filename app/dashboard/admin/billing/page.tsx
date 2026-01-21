"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  ArrowUp,
  FileText
} from 'lucide-react';

export default function AdminBillingPage() {
  const stats = [
    { title: 'Revenus du mois', value: '45,678€', change: '+12.5%', icon: DollarSign },
    { title: 'Factures en attente', value: '12', change: '3,450€', icon: FileText },
    { title: 'Taux de paiement', value: '94.2%', change: '+2.1%', icon: TrendingUp },
    { title: 'MRR', value: '32,450€', change: '+8.3%', icon: CreditCard },
  ];

  const invoices = [
    { id: 'INV-2025-001', client: 'Tech Corp', amount: '2,500€', date: '15 Jan 2025', status: 'paid' },
    { id: 'INV-2025-002', client: 'StartupXYZ', amount: '1,200€', date: '14 Jan 2025', status: 'pending' },
    { id: 'INV-2025-003', client: 'Agency Pro', amount: '4,800€', date: '12 Jan 2025', status: 'paid' },
    { id: 'INV-2025-004', client: 'Digital Inc', amount: '890€', date: '10 Jan 2025', status: 'overdue' },
    { id: 'INV-2025-005', client: 'Web Solutions', amount: '3,200€', date: '08 Jan 2025', status: 'paid' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Facturation</h1>
          <p className="text-gray-400">Gérez les factures et les paiements</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex items-center text-sm text-green-400">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Invoices */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Factures récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">N° Facture</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Montant</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-4 px-4 text-white font-medium">{invoice.id}</td>
                      <td className="py-4 px-4 text-gray-300">{invoice.client}</td>
                      <td className="py-4 px-4 text-white font-bold">{invoice.amount}</td>
                      <td className="py-4 px-4 text-gray-400">{invoice.date}</td>
                      <td className="py-4 px-4">
                        <Badge className={
                          invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                          invoice.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {invoice.status === 'paid' ? 'Payé' :
                           invoice.status === 'pending' ? 'En attente' : 'En retard'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
