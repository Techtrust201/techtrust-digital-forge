"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { 
      title: 'Total Utilisateurs', 
      value: '2,543', 
      change: '+12.5%', 
      positive: true, 
      icon: Users,
      color: 'blue'
    },
    { 
      title: 'Revenus du mois', 
      value: '45,678€', 
      change: '+8.2%', 
      positive: true, 
      icon: CreditCard,
      color: 'green'
    },
    { 
      title: 'Taux de conversion', 
      value: '3.24%', 
      change: '-0.3%', 
      positive: false, 
      icon: TrendingUp,
      color: 'purple'
    },
    { 
      title: 'Utilisateurs actifs', 
      value: '1,234', 
      change: '+5.1%', 
      positive: true, 
      icon: Activity,
      color: 'orange'
    },
  ];

  const recentUsers = [
    { name: 'Jean Dupont', email: 'jean@example.com', tier: 'Gold', status: 'active' },
    { name: 'Marie Martin', email: 'marie@example.com', tier: 'Silver', status: 'active' },
    { name: 'Pierre Bernard', email: 'pierre@example.com', tier: 'Bronze', status: 'pending' },
    { name: 'Sophie Petit', email: 'sophie@example.com', tier: 'Diamond', status: 'active' },
  ];

  const recentTransactions = [
    { id: 'INV-001', client: 'Tech Corp', amount: '2,500€', status: 'paid' },
    { id: 'INV-002', client: 'StartupXYZ', amount: '1,200€', status: 'pending' },
    { id: 'INV-003', client: 'Agency Pro', amount: '4,800€', status: 'paid' },
    { id: 'INV-004', client: 'Digital Inc', amount: '890€', status: 'overdue' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
          <p className="text-gray-400">Vue d&apos;ensemble de votre plateforme</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = getColorClasses(stat.color);
            
            return (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className={`flex items-center text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.positive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent users */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Utilisateurs récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-gray-300 border-gray-600">
                        {user.tier}
                      </Badge>
                      <Badge className={
                        user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {user.status === 'active' ? 'Actif' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent transactions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Transactions récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{transaction.client}</p>
                      <p className="text-sm text-gray-400">{transaction.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{transaction.amount}</span>
                      <Badge className={
                        transaction.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                        transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }>
                        {transaction.status === 'paid' ? 'Payé' :
                         transaction.status === 'pending' ? 'En attente' : 'En retard'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
