"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  TrendingUp,
  ArrowUp, 
  ArrowDown,
  Star,
  Clock,
  UserPlus,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function CommunityAnalyticsPage() {
  const communityData = [
    { name: 'Lun', members: 2340, active: 1560, messages: 890 },
    { name: 'Mar', members: 2380, active: 1620, messages: 920 },
    { name: 'Mer', members: 2450, active: 1780, messages: 1050 },
    { name: 'Jeu', members: 2520, active: 1890, messages: 1180 },
    { name: 'Ven', members: 2600, active: 1950, messages: 1250 },
    { name: 'Sam', members: 2680, active: 1680, messages: 780 },
    { name: 'Dim', members: 2720, active: 1420, messages: 620 }
  ];

  const topContributors = [
    { name: 'Marie D.', messages: 234, reactions: 567, badge: 'Champion' },
    { name: 'Pierre M.', messages: 189, reactions: 432, badge: 'Expert' },
    { name: 'Sophie L.', messages: 156, reactions: 389, badge: 'Leader' },
    { name: 'Jean B.', messages: 134, reactions: 298, badge: 'Actif' },
    { name: 'Claire R.', messages: 112, reactions: 245, badge: 'Régulier' }
  ];

  const sentimentData = [
    { sentiment: 'Positif', value: 72, color: '#10B981' },
    { sentiment: 'Neutre', value: 23, color: '#6B7280' },
    { sentiment: 'Négatif', value: 5, color: '#EF4444' }
  ];

  const quickStats = [
    { title: 'Membres totaux', value: '2,720', change: '+8.5%', positive: true, icon: Users },
    { title: 'Membres actifs', value: '1,890', change: '+12.3%', positive: true, icon: Activity },
    { title: 'Messages/jour', value: '1,250', change: '+18.7%', positive: true, icon: MessageSquare },
    { title: 'Taux engagement', value: '69.5%', change: '+5.2%', positive: true, icon: Heart }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-cyan-500" />
              Community Analytics
            </h1>
            <p className="text-gray-600">
              Statistiques et engagement de votre communauté
            </p>
          </div>
          <Badge className="bg-cyan-100 text-cyan-800 w-fit">
            <Star className="w-3 h-3 mr-1" />
            Communauté active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className="w-8 h-8 text-cyan-500" />
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
                  <TrendingUp className="w-5 h-5 text-cyan-500" />
                  Évolution de la Communauté
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={communityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="members" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} name="Membres" />
                    <Area type="monotone" dataKey="active" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Actifs" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Activité des Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={communityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="messages" stroke="#06B6D4" strokeWidth={2} name="Messages" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-cyan-500" />
                  Top Contributeurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{contributor.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{contributor.name}</h4>
                          <p className="text-sm text-gray-600">{contributor.messages} messages</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Heart className="w-4 h-4 text-red-500" />
                            {contributor.reactions}
                          </div>
                        </div>
                        <Badge className="bg-cyan-100 text-cyan-800">{contributor.badge}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment de la Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentimentData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.sentiment}</span>
                        <span className="text-sm font-bold">{item.value}%</span>
                      </div>
                      <Progress 
                        value={item.value} 
                        className="h-2"
                        style={{ '--progress-background': item.color } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Inviter membres
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Modérer discussions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Récompenser actifs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">Heures de Pic</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>10h - 12h</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Très actif</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>14h - 16h</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Très actif</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>20h - 22h</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Actif</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Suggestion IA</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Lancez un événement pour booster l&apos;engagement de 25%
                </p>
                <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                  Créer événement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
