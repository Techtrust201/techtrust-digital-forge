"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Target,
  ArrowUp, 
  ArrowDown,
  Zap,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function GrowthAnalyticsPage() {
  const growthData = [
    { name: 'Jan', mrr: 12000, users: 450, churn: 2.1 },
    { name: 'Fév', mrr: 14500, users: 520, churn: 1.8 },
    { name: 'Mar', mrr: 18200, users: 680, churn: 1.5 },
    { name: 'Avr', mrr: 22800, users: 890, churn: 1.2 },
    { name: 'Mai', mrr: 28500, users: 1120, churn: 1.0 },
    { name: 'Juin', mrr: 35000, users: 1450, churn: 0.8 }
  ];

  const funnelData = [
    { stage: 'Visiteurs', value: 10000, rate: 100 },
    { stage: 'Leads', value: 2500, rate: 25 },
    { stage: 'MQL', value: 750, rate: 30 },
    { stage: 'SQL', value: 300, rate: 40 },
    { stage: 'Clients', value: 150, rate: 50 }
  ];

  const acquisitionData = [
    { channel: 'SEO', leads: 850, cost: 1200, cac: 1.41 },
    { channel: 'Google Ads', leads: 620, cost: 3500, cac: 5.65 },
    { channel: 'LinkedIn Ads', leads: 340, cost: 2800, cac: 8.24 },
    { channel: 'Referral', leads: 290, cost: 500, cac: 1.72 },
    { channel: 'Organic Social', leads: 180, cost: 800, cac: 4.44 }
  ];

  const quickStats = [
    { title: 'MRR', value: '€35,000', change: '+22.8%', positive: true, icon: DollarSign },
    { title: 'Utilisateurs actifs', value: '1,450', change: '+29.4%', positive: true, icon: Users },
    { title: 'Taux de churn', value: '0.8%', change: '-0.4%', positive: true, icon: TrendingUp },
    { title: 'LTV moyen', value: '€2,450', change: '+15.2%', positive: true, icon: Target }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-purple-500" />
              Growth Analytics
            </h1>
            <p className="text-gray-600">
              Métriques de croissance et KPIs stratégiques
            </p>
          </div>
          <Badge className="bg-purple-100 text-purple-800 w-fit">
            <Zap className="w-3 h-3 mr-1" />
            Hyper-croissance
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-purple-500" />
                    <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  Évolution MRR & Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#8B5CF6" strokeWidth={2} name="MRR (€)" />
                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} name="Utilisateurs" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Funnel de Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelData.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700">{stage.stage}</div>
                      <div className="flex-1">
                        <Progress value={stage.rate} className="h-6" />
                      </div>
                      <div className="w-20 text-right">
                        <div className="font-bold">{stage.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{stage.rate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Coût d&apos;Acquisition par Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={acquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#8B5CF6" name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {acquisitionData.map((channel, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{channel.channel}</span>
                        <Badge variant="outline">€{channel.cac.toFixed(2)}/lead</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Leads</div>
                          <div className="font-medium">{channel.leads}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Coût</div>
                          <div className="font-medium">€{channel.cost}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions Growth</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Rocket className="w-4 h-4 mr-2" />
                    Lancer expérience A/B
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Optimiser funnel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Automatiser acquisition
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Rocket className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Prédiction IA</h3>
                <p className="text-sm text-gray-600 mb-4">
                  MRR prévu fin d&apos;année: €85,000
                </p>
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                  Voir projections
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
